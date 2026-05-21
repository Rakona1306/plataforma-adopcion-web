namespace API.Application.Features.Shelter.Breeds.Dtos
{
    public class CreateBreedDto
    {
        public string Name { get; set; } = string.Empty;

        public Guid SpeciesId { get; set; }
    }
}
