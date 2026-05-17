namespace API.Application.Features.Organization.Roles.Dtos
{
    public class CreateRoleDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public bool? NotDelete { get; set; } = false;
        public bool? ToDashboard { get; set; } = true;
    }
}
