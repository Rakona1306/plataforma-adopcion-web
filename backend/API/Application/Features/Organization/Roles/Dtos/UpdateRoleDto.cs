namespace API.Application.Features.Organization.Roles.Dtos
{
    public class UpdateRoleDto
    {
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public bool NotDelete { get; set; }

        public bool ToDashboard { get; set; }

        public List<Guid> PermissionsToAdd { get; set; } = new();
        public List<Guid> PermissionsToRemove { get; set; } = new();
    }
}
