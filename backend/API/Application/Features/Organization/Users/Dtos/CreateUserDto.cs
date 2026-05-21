namespace API.Application.Features.Organization.Users.Dtos
{
    public class CreateUserDto
    {
        public string Name { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string? Dni { get; set; }

        public string? Phone { get; set; }

        public Guid RoleId { get; set; }
    }
}
