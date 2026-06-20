namespace API.Application.Features.Shelter.Species.Dtos
{
    public class SpeciesResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
    }
}
