namespace API.Application.Features.Shelter.Breeds.Dtos
{
    public class UpdateBreedDto
    {
        public string Name { get; set; } = string.Empty;

        public Guid SpeciesId { get; set; }
    }
}
