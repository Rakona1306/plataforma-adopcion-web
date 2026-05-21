using API.Domain.Model.Enums;

namespace API.Application.Features.Shelter.Pets.Dtos
{
    public class PetFilterDto
    {
        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public string? Search { get; set; }

        public Guid? SpeciesId { get; set; }

        public PetStatus? Status { get; set; }

        public PetGender? Gender { get; set; }

        public PetSize? Size { get; set; }

        public bool? IsVaccinated { get; set; }

        public bool? IsSterilized { get; set; }

        public bool? IsAdopted { get; set; }
    }
}
