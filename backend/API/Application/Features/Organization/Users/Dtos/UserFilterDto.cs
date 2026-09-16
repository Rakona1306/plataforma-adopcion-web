namespace API.Application.Features.Organization.Users.Dtos
{
    public class UserFilterDto
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Search { get; set; }
        public bool? IsBlocked { get; set; }
        public string? District { get; set; }
        public string? RoleId { get; set; }
        public string? Sort { get; set; }
        public bool? ToDashboard { get; set; }
    }
}
