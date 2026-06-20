using API.Application.Features.Shelter.Pets.Dtos;

namespace API.Application.Features.Shelter.MedicalRecords.Dtos
{
    public class MedicalRecordResponse
    {
        public Guid Id { get; set; }

        public Guid PetId { get; set; }

        public string PetName { get; set; } = string.Empty;

        public PetRelationResponse Pet { get; set; }

        public DateTime VisitDate { get; set; }

        public string Diagnosis { get; set; }
            = string.Empty;

        public string? Treatment { get; set; }

        public string? Notes { get; set; }

        public bool RequiresFollowUp { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
