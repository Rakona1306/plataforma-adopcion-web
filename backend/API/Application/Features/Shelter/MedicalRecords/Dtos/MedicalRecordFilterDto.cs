namespace API.Application.Features.Shelter.MedicalRecords.Dtos
{
    public class MedicalRecordFilterDto
    {
        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public string? Search { get; set; }

        public Guid? PetId { get; set; }

        public bool? RequiresFollowUp { get; set; }
    }
}
