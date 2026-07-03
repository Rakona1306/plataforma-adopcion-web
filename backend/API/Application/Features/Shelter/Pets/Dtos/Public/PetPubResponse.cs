using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Shelter.Breeds.Dtos;
using API.Application.Features.Shelter.PetPhotos.Dtos;
using API.Application.Features.Shelter.Species.Dtos.Public;
using API.Application.Features.Shelter.Traits.Dtos;
using API.Application.Features.Shelter.Vaccines.Dtos;
using API.Application.Features.System.Enums.Dto;

namespace API.Application.Features.Shelter.Pets.Dtos.Public
{
    public class PetPubResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? RescueStory { get; set; }
        public DateOnly? BirthDate { get; set; }
        public decimal? WeightKg { get; set; }
        public int Age { get; set; }
        public string? Slug { get; set; } = string.Empty;
        public bool IsVaccinated { get; set; }
        public bool IsSterilized { get; set; }
        public bool IsAdopted { get; set; }
        public EnumResponse Gender { get; set; } = new();
        public EnumResponse Size { get; set; } = new();
        public EnumResponse Status { get; set; } = new();

        public SpeciePubResponse Specie { get; set; } = new();

        public List<OptionBreedResponse> Breeds { get; set; } = [];
        public List<OptionTraitResponse> Traits { get; set; } = [];
        public List<OptionPetPhotoResponse> PhotoUrls { get; set; } = [];
        public List<VaccineRelationResponse> Vaccines { get; set; } = [];
    }
}