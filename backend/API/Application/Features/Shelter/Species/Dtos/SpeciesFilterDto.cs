namespace API.Application.Features.Shelter.Species.Dtos
{
    public class SpeciesFilterDto
    {
        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public string? Search { get; set; }

    }
}
