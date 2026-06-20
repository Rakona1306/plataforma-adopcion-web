namespace API.Application.Features.Organization.Users.Dtos
{
    public class ChangeAccountInfoDto
    {
        public string Name { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? Dni { get; set; } = string.Empty;
        public string? Ruc { get; set; } = string.Empty;
        public string? Phone { get; set; } = string.Empty;
        public string? District { get; set; } = string.Empty;
    }
}