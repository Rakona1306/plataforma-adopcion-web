using API.Application.Common.Services;
using API.Application.Features.Bussiness.Permissions.Dtos;
using API.Application.Features.Organization.Permissions.Mappers;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Domain.Common.Model;
using API.Domain.Model.Organization;
using API.Domain.Repository.Organization;
using API.Infrastructure.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Organization.Permissions
{
    public class PermissionService : BaseService<Permission, IPermissionRepository>, IPermissionService
    {
        private readonly IPermissionRepository _repository;
        private readonly PermissionMapper _mapper;

        public PermissionService(
            IPermissionRepository repository,
            PermissionMapper mapper,
            AuditLogMapper auditLogMapper
        ) : base(repository, auditLogMapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Paginate<PermissionResponse>> GetAllAsync(PermissionFilterDto filter)
        {
            var query = _repository.Query();

            if (!string.IsNullOrWhiteSpace(filter.Search))
                query = query.Where(x => x.Name.Contains(filter.Search));

            if (!string.IsNullOrWhiteSpace(filter.Module))
                query = query.Where(x => x.Module == filter.Module);

            var total = await query.CountAsync();
            var items = await _repository.Paginate(query, filter.Page, filter.PageSize).ToListAsync();

            return new Paginate<PermissionResponse>
            {
                Items = _mapper.ToResponseList(items),
                TotalCount = total,
                Page = filter.Page,
                PageSize = filter.PageSize
            };
        }

        public async Task<PermissionResponse?> GetByIdAsync(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            return entity == null ? null : _mapper.ToResponse(entity);
        }

        public async Task<PermissionResponse> CreateAsync(CreatePermissionDto dto, Guid? userId = null)
        {
            var entity = _mapper.ToEntity(dto);
            await _repository.CreateAsync(entity, userId);
            await _repository.SaveChangesAsync();
            return _mapper.ToResponse(entity);
        }

        public async Task<PermissionResponse> UpdateAsync(Guid id, UpdatePermissionDto dto, Guid? userId = null)
        {
            var entity = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException("Permiso no encontrado");

            _mapper.Update(dto, entity);
            await _repository.UpdateAsync(entity, userId);
            await _repository.SaveChangesAsync();
            return _mapper.ToResponse(entity);
        }

        public async Task DeleteAsync(Guid id, Guid? userId = null)
        {
            var entity = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException("Permiso no encontrado");

            await _repository.DeleteAsync(entity, userId);
            await _repository.SaveChangesAsync();
        }

        public async Task<List<PermissionResponse>> GetAllSimpleAsync()
        {
            // Obtenemos todos los registros de la DB (sin paginación)
            var entities = await _repository.GetAllAsync();

            // Mapeamos a la respuesta y retornamos la lista
            return _mapper.ToResponseList(entities);
        }
    }
}
