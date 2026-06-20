using API.Application.Features.Organization.Roles.Dtos;

namespace API.Application.Features.Organization.Users.Dtos
{
    public class UserResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? Dni { get; set; } = string.Empty;
        public string? Ruc { get; set; } = string.Empty;
        public string? Phone { get; set; } = string.Empty;
        public string? District { get; set; } = string.Empty;
        public string isBlocked { get; set; }
        public RoleResponse Role { get; set; }

        public string RoleName { get; set; } = string.Empty;
    }
}
