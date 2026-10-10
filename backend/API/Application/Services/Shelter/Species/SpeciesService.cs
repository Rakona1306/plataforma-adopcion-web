using API.Application.Common.Services;
using API.Application.Features.Shelter.Species.Dtos;
using API.Application.Features.Shelter.Species.Mappers;
using API.Application.Features.System.AuditLogs.Dtos;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Application.Helpers;
using API.Domain.Common.Model;
using API.Domain.Model.Shelter;
using API.Domain.Repository.Shelter;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Shelter.Species
{
    public class SpeciesService : BaseService<Specie, ISpeciesRepository>, ISpeciesService
    {
        private readonly ISpeciesRepository _repository;
        private readonly SpeciesMapper _mapper;

        public SpeciesService(
            ISpeciesRepository repository,
            SpeciesMapper mapper,
            AuditLogMapper auditLogMapper
        ) : base(repository, auditLogMapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Paginate<SpeciesResponse>> GetAllAsync(SpeciesFilterDto filter)
        {
            var query = _repository.Query();

            if (!string.IsNullOrWhiteSpace(filter.Search))
            {
                query = query.Where(x => x.Name.Contains(filter.Search));
            }

            // El ordenamiento se aplica sobre la entidad antes de proyectar
            query = filter.Sort?.ToLower() switch
            {
                "created" => query.OrderBy(x => x.CreatedAt),
                "-created" => query.OrderByDescending(x => x.CreatedAt),
                "name" => query.OrderBy(x => x.Name),
                "-name" => query.OrderByDescending(x => x.Name),
                _ => query.OrderByDescending(x => x.CreatedAt)
            };

            var totalCount = await query.CountAsync();

            // Aquí aplicamos ProjectTo antes de paginar y materializar la lista
            var items = await _mapper.ProjectToResponse(query)
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            return new Paginate<SpeciesResponse>
            {
                Items = items,
                TotalCount = totalCount,
                Page = filter.Page,
                PageSize = filter.PageSize
            };
        }

        public async Task<SpeciesResponse?> GetByIdAsync(Guid id)
        {
            // Para un solo elemento también podemos aprovechar ProjectTo si lo deseas, o mantener GetByIdAsync
            var query = _repository.Query().Where(x => x.Id == id);
            var response = await _mapper.ProjectToResponse(query).FirstOrDefaultAsync();

            if (response is null)
                throw new Exception("Species not found");

            return response;
        }

        public async Task<SpeciesResponse> CreateAsync(CreateSpeciesDto dto, Guid? userId)
        {
            var exists = await _repository.ExistsAsync(x => x.Name.ToLower() == dto.Name.ToLower());

            if (exists)
                throw new Exception("Species already exists");

            var entity = _mapper.ToEntity(dto);

            AuditHelper.CreateAudit(entity, userId);

            await _repository.CreateAsync(entity, userId);

            await _repository.SaveChangesAsync();

            // Retornamos mapeando la entidad creada o volviendo a consultar por ID con ProjectTo
            return await GetByIdAsync(entity.Id) ?? throw new Exception("Error retrieving created species");
        }

        public async Task<SpeciesResponse> UpdateAsync(Guid id, UpdateSpeciesDto dto, Guid? userId)
        {
            var entity = await _repository.GetByIdAsync(id);

            if (entity is null)
                throw new Exception("Species not found");

            _mapper.Update(dto, entity);

            AuditHelper.UpdateAudit(entity, userId);

            await _repository.UpdateAsync(entity, userId);

            await _repository.SaveChangesAsync();

            return await GetByIdAsync(entity.Id) ?? throw new Exception("Error retrieving updated species");
        }

        public async Task DeleteAsync(Guid id, Guid? userId)
        {
            var entity = await _repository.GetByIdAsync(id);

            if (entity is null)
                throw new Exception("Species not found");

            await _repository.DeleteAsync(entity, userId);

            await _repository.SaveChangesAsync();
        }

        public Task<Paginate<AuditLogResponse>> GetInteractionsAsync(int page, int pageSize, Guid recordId)
        {
            throw new NotImplementedException();
        }
    }
}