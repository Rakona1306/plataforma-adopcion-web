using API.Application.Features.Bussiness.VolunteerApplications.Dtos;
using API.Application.Features.Bussiness.VolunteerApplications.Dtos.Private;
using API.Application.Helpers;
using API.Domain.Common.Model;
using API.Domain.Model.Bussiness;
using API.Domain.Repository.Bussiness;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Bussiness.VolunteerApplications
{

    public interface IVolunteerApplicationService<T>
    {
        Task<Paginate<T>> GetVolunteerApplicationsAsync(VolunteerApplicationFilterDto filter);
        Task<T> GetVolunteerApplicationByIdAsync(int id);
        Task<VolunteerApplicationResponse> CreateVolunteerApplicationAsync(CreateVolunteerApplication dto, Guid? userId = null);
        Task<VolunteerApplicationResponse> UpdateVolunteerApplicationAsync(int id, UpdateVolunteerApplication dto, Guid? userId = null);
        Task<bool> DeleteVolunteerApplicationAsync(int id, Guid? userId = null);
    }

    public abstract class VolunteerApplicationService<T> : IVolunteerApplicationService<T>
    {
        private readonly IVolunteerApplicationRepository _repository;
        private readonly IMapper _mapper;

        protected VolunteerApplicationService(IVolunteerApplicationRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Paginate<T>> GetVolunteerApplicationsAsync(VolunteerApplicationFilterDto filter)
        {
            var query = _repository.Query();

            // 1. Aplicar filtros dinámicos
            query = ApplyFilters(query, filter);

            // 2. Contar total después de filtros
            var totalCount = await query.CountAsync();

            // 3. 🔥 AUTOMATIZACIÓN: Proyectar directo en SQL con AutoMapper
            var items = await query
                .OrderByDescending(x => x.CreatedAt)
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ProjectTo<T>(_mapper.ConfigurationProvider) // SQL optimizado
                .ToListAsync();

            return new Paginate<T>
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

        public async Task<T> GetVolunteerApplicationByIdAsync(int id)
        {
            var response = await _repository.Query()
                .Where(x => x.Id == id)
                .ProjectTo<T>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            if (response is null)
                throw new KeyNotFoundException("La solicitud de voluntariado no fue encontrada.");

            return response;
        }

        public async Task<VolunteerApplicationResponse> CreateVolunteerApplicationAsync(CreateVolunteerApplication dto, Guid? userId = null)
        {
            // 1. Mapeo automático DTO -> Entidad
            var entity = _mapper.Map<VolunteerApplication>(dto);

            // 2. Auditoría de creación
            AuditHelper.CreateIntAudit(entity, userId);

            // 3. Persistir
            await _repository.CreateAsync(entity, userId);
            await _repository.SaveChangesAsync();

            // 4. Retornar respuesta mapeada
            return _mapper.Map<VolunteerApplicationResponse>(entity);
        }

        public async Task<VolunteerApplicationResponse> UpdateVolunteerApplicationAsync(int id, UpdateVolunteerApplication dto, Guid? userId = null)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity is null)
                throw new KeyNotFoundException("La solicitud de voluntariado a actualizar no existe.");

            // Almacenar valores anteriores para auditoría
            var oldValues = new
            {
                entity.Title,
                entity.Description,
                entity.Urgency,
                entity.StartDate,
                entity.EndDate
            };

            // 1. 🔥 AUTOMATIZACIÓN: Mezclar cambios del DTO sobre la entidad rastreada
            _mapper.Map(dto, entity);

            // 2. Auditoría de actualización
            AuditHelper.UpdateIntAudit(entity, userId);

            // 3. Guardar cambios
            await _repository.UpdateAsync(entity, userId, oldValues);
            await _repository.SaveChangesAsync();

            return _mapper.Map<VolunteerApplicationResponse>(entity);
        }

        public async Task<bool> DeleteVolunteerApplicationAsync(int id, Guid? userId = null)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity is null)
                return false;

            await _repository.DeleteAsync(entity, userId);
            await _repository.SaveChangesAsync();
            return true;
        }

        private static IQueryable<VolunteerApplication> ApplyFilters(IQueryable<VolunteerApplication> query, VolunteerApplicationFilterDto filter)
        {
            // Filtro de búsqueda por texto (Título o Descripción)
            if (!string.IsNullOrWhiteSpace(filter.Search))
            {
                query = query.Where(x =>
                    EF.Functions.ILike(x.Title, $"%{filter.Search}%") ||
                    EF.Functions.ILike(x.Description, $"%{filter.Search}%"));
            }

            // Filtro por Urgencia
            if (filter.Urgency.HasValue)
                query = query.Where(x => x.Urgency == filter.Urgency.Value);

            // Filtro por Certificación
            if (filter.IsCertified.HasValue)
                query = query.Where(x => x.IsCertified == filter.IsCertified.Value);

            // Filtro por Rango de Fechas de Inicio
            if (filter.StartDateFrom.HasValue)
                query = query.Where(x => x.StartDate >= filter.StartDateFrom.Value);

            if (filter.StartDateTo.HasValue)
                query = query.Where(x => x.StartDate <= filter.StartDateTo.Value);

            return query;
        }
    }
}
