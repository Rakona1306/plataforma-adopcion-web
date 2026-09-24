namespace API.Application.Features.Shelter.Pets.Dtos
{
    public class PetFilterDto
    {
        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 10;
        public string Search { get; set; } = string.Empty;
        public string Sort { get; set; } = string.Empty;

        public string? Gender { get; set; }
        public string? SpecieId { get; set; }
        public string? Size { get; set; }
        public string? BreedId { get; set; }
        public int? MinAge { get; set; }
        public int? MaxAge { get; set; }

        public bool? IsVaccinated { get; set; }

        public bool? IsSterilized { get; set; }

        public bool? IsAdopted { get; set; }
    }
}
