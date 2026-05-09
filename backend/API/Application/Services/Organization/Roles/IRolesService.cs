using API.Application.Common.Services;
using API.Application.Features.Organization.Roles.Dtos;

namespace API.Application.Services.Organization.Roles
{
    public interface IRolesService: IBaseService<RoleResponse ,CreateRoleDto, CreateRoleDto>
    {
    }
}
