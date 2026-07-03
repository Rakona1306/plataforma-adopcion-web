using API.Application.Features.Bussiness.Permissions.Dtos;

namespace API.Application.Features.Organization.RolePermissions.Dtos
{
    public class RolePermissionResponse
    {
        public int Id { get; set; }
        public PermissionResponse Permission { get; set; } = new();
    }
}