using API.Application.Features.Bussiness.Permissions.Dtos;
using API.Application.Features.Organization.Roles.Dtos;
using API.Domain.Model.Organization;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Roles.Mappers
{
    [Mapper]
    public partial class RoleMapper
    {
        [MapperIgnoreTarget(
        nameof(Role.RolePermissions)
    )]
        public partial Role ToEntity(
        CreateRoleDto dto
    );

        [MapProperty(
            nameof(Role.RolePermissions),
            nameof(RoleResponse.Permissions)
        )]
        public partial RoleResponse ToResponse(
            Role role
        );

        public partial List<RoleResponse>
            ToResponseList(
                List<Role> roles
            );

        public partial void Update(
            UpdateRoleDto dto,
            [MappingTarget] Role entity
        );

        private List<PermissionResponse>
            MapRolePermissions(
                ICollection<RolePermission>
                    rolePermissions
            )
        {
            return rolePermissions
                .Select(
                    x => new PermissionResponse
                    {
                        Id =
                            x.Permission.Id,

                        Name =
                            x.Permission.Name,

                        Module =
                            x.Permission.Module
                    }
                )
                .ToList();
        }
    }
}
