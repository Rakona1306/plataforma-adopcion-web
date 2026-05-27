using API.Application.Common.Services;
using API.Application.Features.Organization.Roles.Dtos;
using API.Application.Features.Roles.Mappers;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Application.Helpers;
using API.Domain.Common.Model;
using API.Domain.Model.Organization;
using API.Domain.Repository.Organization;
using API.Infrastructure.Db; // Necesario para acceder al contexto si buscas permisos
using API.Infrastructure.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Organization.Roles
{
    public class RolesService : BaseService<Role, IRoleRepository>, IRolesService
    {
        private readonly IRoleRepository _repository;
        private readonly IRolePermissionRepository _rolePermissionRepository;
        private readonly RoleMapper _mapper;
        private readonly ConnDbContext _context;


        public RolesService(
            IRoleRepository repository,
            IRolePermissionRepository rolePermissionRepository,
            RoleMapper mapper,
            AuditLogMapper auditLogMapper,
            ConnDbContext context
        ) : base(repository, auditLogMapper)
        {
            _repository = repository;
            _rolePermissionRepository = rolePermissionRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<Paginate<RoleResponse>> GetAllAsync(RoleFilterDto filter)
        {
            IQueryable<Role> query = _repository.QueryWithPermissions();

            if (!string.IsNullOrWhiteSpace(filter.Search))
                query = query.Where(x => x.Name.Contains(filter.Search));

            if (filter.ToDashboard.HasValue)
                query = query.Where(x => x.ToDashboard == filter.ToDashboard);

            var total = await query.CountAsync();
            var items = await query.OrderByDescending(x => x.CreatedAt)
                                   .Skip((filter.Page - 1) * filter.PageSize)
                                   .Take(filter.PageSize)
                                   .ToListAsync();

            return new Paginate<RoleResponse>
            {
                Items = _mapper.ToResponseList(items),
                TotalCount = total,
                Page = filter.Page,
                PageSize = filter.PageSize
            };
        }

        public async Task<RoleResponse?> GetByIdAsync(Guid id)
        {
            var entity = await _repository.QueryWithPermissions()
                .FirstOrDefaultAsync<Role>(x => x.Id == id);

            if (entity is null) throw new NotFoundException("Rol no encontrado");
            return _mapper.ToResponse(entity);
        }

        public async Task<RoleResponse> CreateAsync(
            CreateRoleDto dto,
            Guid? userId
        )
        {
            var exists =
                await _repository.ExistsAsync(
                    x =>
                        x.Name.ToLower()
                        == dto.Name.ToLower()
                );

            if (exists)
            {
                throw new Exception(
                    "Este rol ya existe"
                );
            }

            // =========================================
            // CREAR ROLE
            // =========================================

            var entity =
                _mapper.ToEntity(dto);

            // =========================================
            // RELACIONES
            // =========================================

            entity.RolePermissions = [];

            if (
                dto.PermissionIds != null
                && dto.PermissionIds.Any()
            )
            {
                entity.RolePermissions =
                    dto.PermissionIds
                        .Distinct()
                        .Select(
                            permissionId =>
                                new RolePermission
                                {
                                    Role = entity,
                                    PermissionId = permissionId
                                }
                        )
                        .ToList();
            }

            // =========================================
            // AUDITORÍA
            // =========================================

            AuditHelper.CreateAudit(
                entity,
                userId
            );

            // =========================================
            // GUARDAR TODO
            // =========================================

            await _repository.CreateAsync(
                entity,
                userId
            );

            await _repository.SaveChangesAsync();

            // =========================================
            // RECARGAR
            // =========================================

            var createdRole =
                await _repository
                    .QueryWithPermissions()
                    .FirstOrDefaultAsync(
                        x => x.Id == entity.Id
                    );

            return _mapper.ToResponse(
                createdRole!
            );
        }

        public async Task<RoleResponse> UpdateAsync(
            Guid id,
            UpdateRoleDto dto,
            Guid? userId
        )
        {
            // =========================================
            // OBTENER ROLE CON RELACIONES
            // =========================================

            var entity =
                await _repository
                    .QueryWithPermissions()
                    .FirstOrDefaultAsync(
                        x => x.Id == id
                    )
                ?? throw new NotFoundException(
                    "Rol no encontrado"
                );

            // =========================================
            // VALIDAR NOMBRE ÚNICO
            // =========================================

            var exists =
                await _repository.ExistsAsync(
                    x =>
                        x.Id != id
                        && x.Name.ToLower()
                            == dto.Name.ToLower()
                );

            if (exists)
            {
                throw new Exception(
                    "Ya existe un rol con ese nombre"
                );
            }

            // =========================================
            // ACTUALIZAR DATOS
            // =========================================

            var oldValues = new
            {
                entity.Name,
                entity.Description,
                entity.NotDelete,
                entity.ToDashboard
            };

            _mapper.Update(dto, entity);

            // =========================================
            // REMOVE PERMISSIONS
            // =========================================

            if (
                dto.PermissionsToRemove != null
                && dto.PermissionsToRemove.Any()
            )
            {
                entity.RolePermissions =
                    entity.RolePermissions
                        .Where(
                            rp =>
                                !dto.PermissionsToRemove
                                    .Contains(
                                        rp.PermissionId
                                    )
                        )
                        .ToList();
            }

            // =========================================
            // ADD PERMISSIONS
            // =========================================

            if (
                dto.PermissionsToAdd != null
                && dto.PermissionsToAdd.Any()
            )
            {
                // Evitar duplicados

                var currentPermissionIds =
                    entity.RolePermissions
                        .Select(x => x.PermissionId)
                        .ToHashSet();

                // Validar permisos existentes

                var validPermissions =
                    await _context.Permissions
                        .Where(
                            x =>
                                dto.PermissionsToAdd
                                    .Contains(x.Id)
                        )
                        .Select(x => x.Id)
                        .ToListAsync();

                var newRelations =
                    validPermissions
                        .Where(
                            permissionId =>
                                !currentPermissionIds
                                    .Contains(permissionId)
                        )
                        .Select(
                            permissionId =>
                                new RolePermission
                                {
                                    RoleId = entity.Id,
                                    PermissionId = permissionId
                                }
                        )
                        .ToList();

                foreach (var relation in newRelations)
                {
                    entity.RolePermissions.Add(
                        relation
                    );
                }
            }

            // =========================================
            // AUDITORÍA
            // =========================================

            AuditHelper.UpdateAudit(
                entity,
                userId
            );

            // =========================================
            // UPDATE
            // =========================================

            await _repository.UpdateAsync(
                entity,
                userId,
                oldValues
            );

            await _repository.SaveChangesAsync();

            // =========================================
            // RECARGAR
            // =========================================

            var updatedRole =
                await _repository
                    .QueryWithPermissions()
                    .FirstOrDefaultAsync(
                        x => x.Id == id
                    );

            return _mapper.ToResponse(
                updatedRole!
            );
        }

        public async Task DeleteAsync(Guid id, Guid? userId)
        {
            var entity = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException("Rol no encontrado");

            if (entity.NotDelete) throw new Exception("Este rol no puede ser eliminado");

            await _repository.DeleteAsync(entity, userId);
            await _repository.SaveChangesAsync();
        }
    }
}
