using API.Domain.Model.Enums;

namespace API.Application.Features.Shelter.Pets.Dtos
{
    public class CreatePetDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? RescueStory { get; set; }
        public DateOnly? BirthDate { get; set; }
        public decimal? WeightKg { get; set; }
        public bool IsVaccinated { get; set; }
        public bool IsSterilized { get; set; }
        public bool IsAdopted { get; set; }
        public int Age { get; set; }
        public PetGender Gender { get; set; }
        public PetSize Size { get; set; }
        public PetStatus Status { get; set; }
        public Guid SpeciesId { get; set; }

        public UpdatePetRelationDto BreedIds { get; set; }
        public UpdatePetRelationDto TraitIds { get; set; }
    }

}
