using API.Application.Features.Organization.Roles.Dtos;
using API.Domain.Model.Organization;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Roles.Mappers
{
    [Mapper]
    public partial class RoleMapper
    {
        public partial Role ToEntity(CreateRoleDto request);
        public partial RoleResponse ToResponse(Role role);
        public partial List<RoleResponse> ToResponseList(List<Role> roles);
        public partial void Update(UpdateRoleDto source, [MappingTarget] Role target);
    }
}
