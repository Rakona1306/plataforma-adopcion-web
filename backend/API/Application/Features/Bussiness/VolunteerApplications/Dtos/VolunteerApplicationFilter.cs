using API.Domain.Model.Bussiness;

namespace API.Application.Features.Bussiness.VolunteerApplications.Dtos
{
    public class VolunteerApplicationFilterDto
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Search { get; set; }
        public UrgencyLevel? Urgency { get; set; }
        public bool? IsCertified { get; set; }
        public DateTime? StartDateFrom { get; set; }
        public DateTime? StartDateTo { get; set; }
    }
}
