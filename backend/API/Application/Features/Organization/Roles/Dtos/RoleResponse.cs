using API.Application.Features.Bussiness.Permissions.Dtos;

namespace API.Application.Features.Organization.Roles.Dtos
{
    public class RoleResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public bool ToDashboard { get; set; }
        public DateTime CreatedAt { get; set; }

        public int UsersCount { get; set; } = 0;

        public List<PermissionResponse> Permissions { get; set; } = [];
    }
}
