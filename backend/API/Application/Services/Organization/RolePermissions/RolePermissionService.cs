using API.Application.Features.Organization.RolePermissions.Dtos;
using API.Application.Features.Organization.RolePermissions.Mappers;
using API.Domain.Repository.Organization;

namespace API.Application.Services.Organization.RolePermissions
{
    public class RolePermissionService : IRolePermissionService
    {
        private readonly IRolePermissionRepository _repository;
        private readonly RolePermissionMapper _mapper;
        public RolePermissionService(
            IRolePermissionRepository repository,
            RolePermissionMapper mapper
        )
        {
            _repository = repository;
            _mapper = mapper;
        }

        async public Task<List<RolePermissionResponse>> GetPermissionsByRoleId(Guid roleId)
        {
            var entityList = await _repository.GetPermissionsByRoleId(roleId);

            return _mapper.ToResponseList(entityList);
        }
    }
}