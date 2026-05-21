using API.Domain.Model.Enums;

namespace API.Application.Features.Shelter.Pets.Dtos
{
    public class CreatePetDto
    {
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public Guid SpeciesId { get; set; }

        public decimal? WeightKg { get; set; }

        public bool IsVaccinated { get; set; }

        public bool IsSterilized { get; set; }

        public PetGender Gender { get; set; }

        public PetSize Size { get; set; }

        public PetStatus Status { get; set; }

        public List<Guid> BreedIds { get; set; } = [];

        public List<Guid> TraitIds { get; set; } = [];
    }
}
