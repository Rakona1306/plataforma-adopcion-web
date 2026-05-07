using API.Application.Features.Roles.Dtos;
using API.Domain.Model;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Roles.Mappers
{
    [Mapper]
    public partial class RoleMapper
    {
        public partial Role ToEntity(CreateRoleDto request);

        public partial RoleResponse ToResponse(Role role);

        public partial List<RoleResponse> ToResponseList(List<Role> roles);
        public partial RoleResponse UpdateRole(CreateRoleDto request, Role role);
    }
}
