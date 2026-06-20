namespace API.Application.Features.Shelter.Vaccines.Dtos
{
    public class VaccineFilterDto
    {
        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public string? Search { get; set; }
    }
}
