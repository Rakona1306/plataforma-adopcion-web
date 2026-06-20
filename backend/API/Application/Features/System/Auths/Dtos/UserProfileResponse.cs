using API.Application.Features.Organization.Roles.Dtos;

namespace API.Application.Features.System.Auths.Dtos
{
    public class UserProfileResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Dni { get; set; } = string.Empty;
        public string? Ruc { get; set; } = string.Empty;
        public string? Phone { get; set; } = string.Empty;
        public string? District { get; set; } = string.Empty;
        public RoleResponse? Role { get; set; }
        public bool ToDashboard { get; set; }
    }
}
