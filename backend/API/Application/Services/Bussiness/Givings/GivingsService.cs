using API.Application.Features.Bussiness.Givings.Dtos;
using API.Application.Features.Bussiness.Givings.Dtos.Private;
using API.Application.Helpers;
using API.Domain.Common.Model;
using API.Domain.Model.Bussiness;
using API.Domain.Repository.Bussiness;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Bussiness.Givings
{
    public interface IGivingsService
    {
        Task<Paginate<GivingResponse>> GetGivingsAsync(GivingFilterDto filter);
        Task<GivingResponse> GetGivingByIdAsync(int id);
        Task<GivingResponse> CreateGivingAsync(CreateGivingDto dto, Guid? userId = null);
        Task<GivingResponse> UpdateGivingAsync(int id, UpdateGivingDto dto, Guid? userId = null);
        Task<bool> DeleteGivingAsync(int id, Guid? userId = null);
    }
    public class GivingsService : IGivingsService
    {
        private readonly IGivingRepository _repository; // Tu repositorio específico para Giving
        private readonly IMapper _mapper;

        public GivingsService(IGivingRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Paginate<GivingResponse>> GetGivingsAsync(GivingFilterDto filter)
        {
            var query = _repository.Query();

            // 1. Aplicar filtros anatómicos dinámicos
            query = ApplyFilters(query, filter);

            // 2. Contar después de aplicar los filtros
            var totalCount = await query.CountAsync();

            // 3. 🔥 AUTOMATIZACIÓN CLAVE: Proyectar directo en SQL con AutoMapper
            var items = await query
                .OrderByDescending(x => x.CreatedAt)
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ProjectTo<GivingResponse>(_mapper.ConfigurationProvider) // SQL optimizado
                .ToListAsync();

            return new Paginate<GivingResponse>
            {
                Items = items,
                TotalCount = totalCount,
                Page = filter.Page,
                PageSize = filter.PageSize,
                TotalPages = filter.PageSize > 0
                    ? (totalCount + filter.PageSize - 1) / filter.PageSize
                    : 0
            };
        }

        public async Task<GivingResponse> GetGivingByIdAsync(int id)
        {
            // Proyección directa para optimizar el GET individual
            var response = await _repository.Query()
                .Where(x => x.Id == id)
                .ProjectTo<GivingResponse>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            if (response is null)
                throw new KeyNotFoundException("La donación solicitada no fue encontrada.");

            return response;
        }

        public async Task<GivingResponse> CreateGivingAsync(CreateGivingDto dto, Guid? userId = null)
        {
            // 1. Mapeo automático de DTO a Entidad
            var entity = _mapper.Map<Giving>(dto);

            // 2. Aplicar auditoría de creación
            AuditHelper.CreateIntAudit(entity, userId);

            // 3. Persistir en base de datos
            await _repository.CreateAsync(entity, userId);
            await _repository.SaveChangesAsync();

            // 4. Retornar respuesta mapeada
            return _mapper.Map<GivingResponse>(entity);
        }

        public async Task<GivingResponse> UpdateGivingAsync(int id, UpdateGivingDto dto, Guid? userId = null)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity is null)
                throw new KeyNotFoundException("La donación a actualizar no existe.");

            // Almacenar valores anteriores para el log de auditoría antes de mutar la entidad
            var oldValues = new
            {
                entity.Name,
                entity.Type,
                entity.Amount,
                entity.Quantity,
                entity.Unit,
                entity.Kg
            };

            // 1. 🔥 AUTOMATIZACIÓN: Mezclar los cambios del DTO sobre la entidad rastreada
            _mapper.Map(dto, entity);

            // 2. Aplicar auditoría de actualización
            AuditHelper.UpdateIntAudit(entity, userId);

            // 3. Guardar cambios
            await _repository.UpdateAsync(entity, userId, oldValues);
            await _repository.SaveChangesAsync();

            return _mapper.Map<GivingResponse>(entity);
        }

        public async Task<bool> DeleteGivingAsync(int id, Guid? userId = null)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity is null)
                return false;

            await _repository.DeleteAsync(entity, userId);
            await _repository.SaveChangesAsync();
            return true;
        }

        private static IQueryable<Giving> ApplyFilters(IQueryable<Giving> query, GivingFilterDto filter)
        {
            if (!string.IsNullOrWhiteSpace(filter.Search))
                query = query.Where(x => EF.Functions.ILike(x.Name, $"%{filter.Search}%"));

            if (filter.Type.HasValue)
                query = query.Where(x => x.Type == filter.Type.Value);

            if (filter.Unit.HasValue)
                query = query.Where(x => x.Unit == filter.Unit.Value);

            if (filter.MinAmount.HasValue)
                query = query.Where(x => x.Amount >= filter.MinAmount.Value);

            if (filter.MaxAmount.HasValue)
                query = query.Where(x => x.Amount <= filter.MaxAmount.Value);

            return query;
        }
    }
}