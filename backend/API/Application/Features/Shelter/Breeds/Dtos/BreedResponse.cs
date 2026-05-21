namespace API.Application.Features.Shelter.Breeds.Dtos
{
    public class BreedResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public Guid SpeciesId { get; set; }

        public string SpeciesName { get; set; }
            = string.Empty;

        public DateTime CreatedAt { get; set; }
    }
}
