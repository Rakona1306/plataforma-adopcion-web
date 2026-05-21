namespace API.Application.Features.Organization.Users.Dtos
{
    public class UpdateUserDto
    {
        public string Name { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string? Phone { get; set; }

        public bool? IsBlocked { get; set; }

        public Guid RoleId { get; set; }
    }
}
