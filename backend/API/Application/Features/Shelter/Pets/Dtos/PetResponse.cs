namespace API.Application.Features.Shelter.Pets.Dtos
{
    public class PetResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Species { get; set; } = string.Empty;

        public bool IsVaccinated { get; set; }

        public bool IsSterilized { get; set; }

        public bool IsAdopted { get; set; }

        public List<string> Breeds { get; set; } = [];

        public List<string> Traits { get; set; } = [];

        public List<string> Photos { get; set; } = [];
    }
}
