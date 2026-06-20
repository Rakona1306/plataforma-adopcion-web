using API.Application.Features.Shelter.Pets.Dtos;
using API.Application.Features.Shelter.Vaccines.Dtos;

namespace API.Application.Features.Shelter.PetVaccines.Dtos
{
    public class PetVaccineResponse
    {
        public Guid Id { get; set; }
        public Guid PetId { get; set; }

        public Guid VaccineId { get; set; }

        public VaccineRelationResponse Vaccine { get; set; } = new();
        public PetRelationResponse Pet { get; set; } = new();

        public DateTime AppliedDate { get; set; }

        public DateTime? ExpirationDate { get; set; }

        public bool IsExpired { get; set; }
    }
}
