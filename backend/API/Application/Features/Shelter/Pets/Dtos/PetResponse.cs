using API.Application.Features.Shelter.Breeds.Dtos;
using API.Application.Features.Shelter.Traits.Dtos;
using API.Application.Features.System.Enums.Dto;

namespace API.Application.Features.Shelter.Pets.Dtos
{
    public class PetResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? RescueStory { get; set; }
        public DateOnly? BirthDate { get; set; }
        public decimal? WeightKg { get; set; }

        // Estados
        public bool IsVaccinated { get; set; }
        public bool IsSterilized { get; set; }
        public bool IsAdopted { get; set; }
        public EnumResponse Gender { get; set; } // Mapeado desde el Enum
        public EnumResponse Size { get; set; }   // Mapeado desde el Enum
        public EnumResponse Status { get; set; } // Mapeado desde el Enum
        public Guid SpeciesId { get; set; }

        // Relaciones (para que el frontend tenga contexto)
        public string SpeciesName { get; set; } = string.Empty;
        public List<OptionBreedResponse> Breeds { get; set; } = [];
        public List<OptionTraitResponse> Traits { get; set; } = [];
        public List<string> PhotoUrls { get; set; } = [];

        public DateTime CreatedAt { get; set; }
    }
}
