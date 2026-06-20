namespace API.Application.Features.Shelter.MedicalRecords.Dtos
{
    public class CreateMedicalRecordDto
    {
        public Guid PetId { get; set; }

        public DateTime VisitDate { get; set; }

        public string Diagnosis { get; set; }
            = string.Empty;

        public string? Treatment { get; set; }

        public string? Notes { get; set; }

        public bool RequiresFollowUp { get; set; }
    }
}
