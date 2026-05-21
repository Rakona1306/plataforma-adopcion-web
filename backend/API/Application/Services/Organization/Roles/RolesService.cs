using API.Application.Common.Services;
using API.Application.Features.Organization.Roles.Dtos;
using API.Application.Features.Roles.Mappers;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Application.Helpers;
using API.Domain.Common.Model;
using API.Domain.Model.Organization;
using API.Domain.Repository.Organization;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Organization.Roles
{
    public class RolesService : BaseService<Role, IRoleRepository>, IRolesService
    {
        private readonly IRoleRepository _repository;
        private readonly RoleMapper _mapper;

        public RolesService(
            IRoleRepository repository,
            RoleMapper mapper,
            AuditLogMapper auditLogMapper
        ) : base(repository, auditLogMapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Paginate<RoleResponse>>
            GetAllAsync(
                RoleFilterDto filter
            )
        {
            IQueryable<Role> query =
                _repository.Query();

            if (!string.IsNullOrWhiteSpace(
                filter.Search
            ))
            {
                query = query.Where(x =>
                    x.Name.Contains(filter.Search)
                );
            }

            if (filter.ToDashboard.HasValue)
            {
                query = query.Where(x =>
                    x.ToDashboard ==
                    filter.ToDashboard
                );
            }

            var total =
                await query.CountAsync();

            var items = await query
                .OrderByDescending(x =>
                    x.CreatedAt
                )
                .Skip((filter.Page - 1)
                    * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            return new Paginate<RoleResponse>
            {
                Items =
                    _mapper.ToResponseList(items),

                TotalCount = total,

                Page = filter.Page,

                PageSize = filter.PageSize
            };
        }

        public async Task<RoleResponse?>
            GetByIdAsync(Guid id)
        {
            var entity =
                await _repository.GetByIdAsync(id);

            if (entity is null)
            {
                throw new Exception(
                    "Rol no encontrado"
                );
            }

            return _mapper.ToResponse(entity);
        }

        public async Task<RoleResponse>
            CreateAsync(
                CreateRoleDto dto,
                Guid? userId
            )
        {
            var exists =
                await _repository.ExistsAsync(x =>
                    x.Name.ToLower() ==
                    dto.Name.ToLower()
                );

            if (exists)
            {
                throw new Exception(
                    "Este rol ya existe"
                );
            }

            var entity =
                _mapper.ToEntity(dto);

            AuditHelper.CreateAudit(
                entity,
                userId
            );

            await _repository.CreateAsync(
                entity,
                userId
            );

            await _repository.SaveChangesAsync();

            return _mapper.ToResponse(entity);
        }

        public async Task<RoleResponse>
            UpdateAsync(
                Guid id,
                UpdateRoleDto dto,
                Guid? userId
            )
        {
            var entity =
                await _repository.GetByIdAsync(id);

            if (entity is null)
            {
                throw new Exception(
                    "Rol no encontrado"
                );
            }

            var oldValues = new
            {
                entity.Name,
                entity.Description,
                entity.ToDashboard,
                entity.NotDelete
            };

            _mapper.Update(dto, entity);

            AuditHelper.UpdateAudit(
                entity,
                userId
            );

            await _repository.UpdateAsync(
                entity,
                userId,
                oldValues
            );

            await _repository.SaveChangesAsync();

            return _mapper.ToResponse(entity);
        }

        public async Task DeleteAsync(
            Guid id,
            Guid? userId
        )
        {
            var entity =
                await _repository.GetByIdAsync(id);

            if (entity is null)
            {
                throw new Exception(
                    "Rol no encontrado"
                );
            }

            if (entity.NotDelete)
            {
                throw new Exception(
                    "Este rol no puede ser eliminado"
                );
            }

            await _repository.DeleteAsync(
                entity,
                userId
            );

            await _repository.SaveChangesAsync();
        }
    }
}
