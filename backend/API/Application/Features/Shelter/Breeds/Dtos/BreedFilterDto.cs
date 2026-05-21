namespace API.Application.Features.Shelter.Breeds.Dtos
{
    public class BreedFilterDto
    {
        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public string? Search { get; set; }

        public Guid? SpeciesId { get; set; }
    }
}
