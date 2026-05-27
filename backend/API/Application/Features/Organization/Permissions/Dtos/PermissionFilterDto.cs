namespace API.Application.Features.Bussiness.Permissions.Dtos
{
    public class PermissionFilterDto
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Search { get; set; }
        public string? Module { get; set; }
    }
}
