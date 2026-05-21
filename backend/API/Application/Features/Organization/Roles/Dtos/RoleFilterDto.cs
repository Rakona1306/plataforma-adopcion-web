namespace API.Application.Features.Organization.Roles.Dtos
{
    public class RoleFilterDto
    {
        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public string? Search { get; set; }

        public bool? ToDashboard { get; set; }
    }
}
