using API.Application.Common.Services;
using API.Application.Features.Bussiness.Permissions.Dtos;
using API.Application.Features.Organization.Roles.Dtos;
using API.Application.Features.Roles.Mappers;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Application.Helpers;
using API.Domain.Common.Model;
using API.Domain.Model.Enums;
using API.Domain.Model.Organization;
using API.Domain.Repository.Organization;
using API.Domain.Repository.System;
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
        private readonly IAuditLogRepository _auditLogRepository;

        public RolesService(
            IRoleRepository repository,
            IRolePermissionRepository rolePermissionRepository,
            RoleMapper mapper,
            AuditLogMapper auditLogMapper,
            ConnDbContext context,
            IAuditLogRepository auditLogRepository
        ) : base(repository, auditLogMapper)
        {
            _repository = repository;
            _rolePermissionRepository = rolePermissionRepository;
            _mapper = mapper;
            _context = context;
            _auditLogRepository = auditLogRepository;
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
                                   .Select(x => new RoleResponse
                                   {
                                       Id = x.Id,
                                       Name = x.Name,
                                       Description = x.Description,
                                       ToDashboard = x.ToDashboard,
                                       CreatedAt = x.CreatedAt,
                                       UsersCount = x.Users.Count(),
                                       Permissions = x.RolePermissions.Select(rp => new PermissionResponse
                                       {
                                           Id = rp.Permission.Id,
                                           Name = rp.Permission.Name,
                                           Module = rp.Permission.Module
                                       }).ToList()
                                   })
                                   .ToListAsync();

            return new Paginate<RoleResponse>
            {
                Items = items,
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
                throw new AlreadyExistException(
                    "Este rol ya existe"
                );
            }

            var entity =
                _mapper.ToEntity(dto);

            entity.RolePermissions = [];

            if (
                dto.CurrentPermissions != null
                && dto.CurrentPermissions.Any()
            )
            {
                entity.RolePermissions =
                    dto.CurrentPermissions
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

            AuditHelper.CreateAudit(
                entity,
                userId
            );

            await _repository.CreateAsync(
                entity,
                userId
            );

            await _repository.SaveChangesAsync();

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
            var entity =
                await _repository
                    .QueryWithPermissions()
                    .FirstOrDefaultAsync(
                        x => x.Id == id
                    )
                ?? throw new NotFoundException(
                    "Rol no encontrado"
                );

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

            var oldValues = new
            {
                entity.Name,
                entity.Description,
                entity.NotDelete,
                entity.ToDashboard
            };

            // =========================================
            // UPDATE DATA
            // =========================================

            _mapper.Update(dto, entity);

            // =========================================
            // REMOVE PERMISSIONS
            // =========================================

            if (
                dto.PermissionsToRemove != null
                && dto.PermissionsToRemove.Any()
            )
            {
                var relationsToRemove =
                    await _context.RolePermissions
                        .Where(
                            rp =>
                                rp.RoleId == id
                                && dto.PermissionsToRemove
                                    .Contains(
                                        rp.PermissionId
                                    )
                        )
                        .ToListAsync();

                _context.RolePermissions.RemoveRange(
                    relationsToRemove
                );
            }

            // =========================================
            // ADD PERMISSIONS
            // =========================================

            if (
                dto.PermissionsToAdd != null
                && dto.PermissionsToAdd.Any()
            )
            {
                var existingPermissionIds =
                    await _context.RolePermissions
                        .Where(
                            rp => rp.RoleId == id
                        )
                        .Select(
                            rp => rp.PermissionId
                        )
                        .ToListAsync();

                var permissionsToAdd =
                    dto.PermissionsToAdd
                        .Distinct()
                        .Where(
                            permissionId =>
                                !existingPermissionIds
                                    .Contains(permissionId)
                        )
                        .ToList();

                foreach (var permissionId in permissionsToAdd)
                {
                    await _context.RolePermissions.AddAsync(
                        new RolePermission
                        {
                            RoleId = id,
                            PermissionId = permissionId
                        }
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

            await _auditLogRepository.CreateAsync(
                AuditEnum.UPDATE,
                entity.Id,
                nameof(Role),
                userId,
                oldValues
            );

            // =========================================
            // SAVE
            // =========================================

            await _repository.SaveChangesAsync();

            // =========================================
            // RETURN UPDATED
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
