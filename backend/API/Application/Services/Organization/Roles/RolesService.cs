using API.Application.Features.Organization.Roles.Dtos;
using API.Application.Features.Roles.Mappers;
using API.Application.Features.System.AuditLogs.Dtos;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Domain.Common.Model;
using API.Domain.Model.Enums;
using API.Domain.Model.Organization;
using API.Domain.Model.System;
using API.Domain.Repository.Organization;
using API.Domain.Repository.System;
using System.Text.Json;

namespace API.Application.Services.Organization.Roles
{
    public class RolesService : IRolesService
    {
        private readonly IRoleRepository _repository;
        private readonly RoleMapper _mapper;
        private readonly AuditLogMapper _auditMapper;
        private readonly IAuditLogRepository _auditRepository;
        private readonly string _tableName;

        public RolesService(IRoleRepository roleRepository, IAuditLogRepository auditLogRepository)
        {
            _mapper = new RoleMapper();
            _auditMapper = new AuditLogMapper();
            _repository = roleRepository;
            _auditRepository = auditLogRepository;
            _tableName = "Roles";
        }

        public async Task<RoleResponse> CreateAsync(CreateRoleDto request)
        {
            var role = _mapper.ToEntity(request);

            var created = await _repository.CreateAsync(role);
            await _auditRepository.CreateAsync<Role>(
                AuditEnum.CREATE,
                created.Id,
                _tableName,
                null,
                null
            );

            return _mapper.ToResponse(created);
        }

        public async Task DeleteAsync(Guid id, Guid? userId)
        {
            var role = await _repository.GetByIdAsync(id);

            if (role is null)
            {
                throw new Exception("Role not found");
            }
            Role deletedRole = role;
            await _repository.DeleteAsync(role, id);

            await _auditRepository.CreateAsync<Role>(
                    AuditEnum.DELETE,
                    deletedRole.Id,
                    _tableName,
                    userId,
                    deletedRole
                );
        }

        public async Task<Paginate<RoleResponse>> GetAllAsync(
            int page,
            int pageSize,
            string? search = null,
            string? sort = null
        )
        {
            Paginate<Role> paginateRole =
                await _repository.GetAllAsync(
                    page,
                    pageSize,
                    search,
                    sort
                );

            return new Paginate<RoleResponse>
            {
                Items = _mapper.ToResponseList(paginateRole.Items.ToList()),
                TotalCount = paginateRole.TotalCount,
                Page = paginateRole.Page,
                PageSize = paginateRole.PageSize
            };
        }

        public async Task<RoleResponse?> GetByIdAsync(Guid id)
        {
            var role = await _repository.GetByIdAsync(id);

            if (role is null)
            {
                return null;
            }

            return _mapper.ToResponse(role);
        }

        public async Task<Paginate<AuditLogResponse>> GetInteractionsAsync(int page, int pageSize, Guid RecordId)
        {
            Paginate<AuditLog> auditLogs = await _auditRepository.GetInteractionsAsync(page, pageSize, RecordId, _tableName);

            return new Paginate<AuditLogResponse>()
            {
                Items = _auditMapper.ToResponseList([.. auditLogs.Items]),
                TotalCount = auditLogs.TotalCount,
                Page = auditLogs.Page,
                PageSize = auditLogs.PageSize
            };
        }

        public async Task<RoleResponse> UpdateAsync(CreateRoleDto entity, Guid id, Guid? userId)
        {
            var existingRole =
                await _repository.GetByIdAsync(id);

            if (existingRole is null)
            {
                throw new Exception("Role not found");
            }
            var mappedRoleInteraction = _mapper.ToResponse(existingRole);
            var oldValue = JsonSerializer.Deserialize<RoleResponse>(
                JsonSerializer.Serialize(mappedRoleInteraction)
             );

            _mapper.UpdateRole(
                entity,
                existingRole
            );

            existingRole.UpdatedBy = userId;

            existingRole.LastUpdatedAt =
                DateTime.UtcNow;

            Console.WriteLine(existingRole.Name);
            var roleUpdated =
                await _repository.UpdateAsync(
                    existingRole,
                    id
                );
            await _auditRepository.CreateAsync<RoleResponse>(
                AuditEnum.UPDATE,
                existingRole.Id,
                _tableName,
                userId,
                oldValue
            );

            return _mapper.ToResponse(roleUpdated);
        }
    }
}
