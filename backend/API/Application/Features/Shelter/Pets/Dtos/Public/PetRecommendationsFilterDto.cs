using System;

namespace API.Application.Features.Shelter.Pets.Dtos.Public
{
    public class PetRecommendationsFilterDto
    {
        public int PageSize { get; set; } = 10;
        public string? SpecieId { get; set; }
        public string? BreedIds { get; set; }
        public string? TraitIds { get; set; }
        public string? NotId { get; set; } // notId - el pet que no debe mostrar

        public Guid? ParseSpecieId() =>
            string.IsNullOrWhiteSpace(SpecieId) ? null : Guid.Parse(SpecieId);

        public Guid[] ParseBreedIds() =>
            string.IsNullOrWhiteSpace(BreedIds) ? [] : BreedIds.Split(',').Select(Guid.Parse).ToArray();

        public Guid[] ParseTraitIds() =>
            string.IsNullOrWhiteSpace(TraitIds) ? [] : TraitIds.Split(',').Select(Guid.Parse).ToArray();

        public Guid? ParsePetId() =>
            string.IsNullOrWhiteSpace(NotId) ? null : Guid.Parse(NotId);
    }
}
