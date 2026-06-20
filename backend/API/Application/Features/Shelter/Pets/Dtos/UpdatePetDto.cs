using API.Domain.Model.Enums;

namespace API.Application.Features.Shelter.Pets.Dtos
{
    public class UpdatePetDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? RescueStory { get; set; }
        public DateOnly? BirthDate { get; set; }
        public decimal? WeightKg { get; set; }
        public bool IsVaccinated { get; set; }
        public bool IsSterilized { get; set; }
        public PetGender Gender { get; set; }
        public PetSize Size { get; set; }
        public PetStatus Status { get; set; }
        public Guid SpeciesId { get; set; }

        public UpdatePetRelationDto Breeds { get; set; } = new();
        public UpdatePetRelationDto Traits { get; set; } = new();
    }
    public class UpdatePetRelationDto
    {
        // Solo enviamos los IDs que se deben procesar
        public List<Guid> AddIds { get; set; } = [];
        public List<Guid> RemoveIds { get; set; } = [];
    }
}
