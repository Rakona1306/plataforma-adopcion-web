using API.Domain.Common.Model;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Domain.Model.Shelter
{
    public class PetVaccine : BaseModel
    {
        public Guid PetId { get; set; }

        [ForeignKey("PetId")]
        public Pet Pet { get; set; }

        public Guid VaccineId { get; set; }
        public Vaccine Vaccine { get; set; } = null!;

        public DateTime AppliedDate { get; set; }

        public DateTime? ExpirationDate { get; set; }
    }
}
