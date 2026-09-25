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
        public bool IsRecommend { get; set; } = false;
        public bool IsAdopted { get; set; }
        public int Age { get; set; }
        public int GenderId { get; set; }
        public int SizeId { get; set; }
        public int StatusId { get; set; }
        public Guid SpeciesId { get; set; }

        public UpdatePetRelationDto BreedIds { get; set; } = null!;
        public UpdatePetRelationDto TraitIds { get; set; } = null!;
    }

}
