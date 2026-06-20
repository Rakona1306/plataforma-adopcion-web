namespace API.Application.Features.Shelter.MedicalRecords.Dtos
{
    public class MedicalRecordResponse
    {
        public Guid Id { get; set; }

        public Guid PetId { get; set; }

        public string PetName { get; set; }
            = string.Empty;

        public DateTime VisitDate { get; set; }

        public string Diagnosis { get; set; }
            = string.Empty;

        public string? Treatment { get; set; }

        public string? Notes { get; set; }

        public bool RequiresFollowUp { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
