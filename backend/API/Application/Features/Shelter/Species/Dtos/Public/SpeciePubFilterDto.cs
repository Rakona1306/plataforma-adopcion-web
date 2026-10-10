namespace API.Application.Features.Shelter.Species.Dtos.Public
{
    public class SpeciesPubFilterDto
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Search { get; set; }
    }
}