using API.Domain.Common.Model;

namespace API.Domain.Model.Shelter
{
    public class PetVaccine : BaseModel
    {
        public Guid PetId { get; set; }
        public Pet Pet { get; set; } = null!;

        public Guid VaccineId { get; set; }
        public Vaccine Vaccine { get; set; } = null!;

        public DateTime AppliedDate { get; set; }

        public DateTime? ExpirationDate { get; set; }
    }
}
