using API.Domain.Common.Model;

namespace API.Domain.Model.Shelter
{
    public class MedicalRecord : BaseModel
    {
        public Guid PetId { get; set; }
        public Pet Pet { get; set; } = null!;

        public DateTime VisitDate { get; set; }

        public string Diagnosis { get; set; } = string.Empty;

        public string? Treatment { get; set; }

        public string? Notes { get; set; }

        public bool RequiresFollowUp { get; set; }
    }
}
