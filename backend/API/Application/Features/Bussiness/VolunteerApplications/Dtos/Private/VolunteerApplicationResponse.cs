using API.Domain.Model.Bussiness;

namespace API.Application.Features.Bussiness.VolunteerApplications.Dtos.Private
{
    public class VolunteerApplicationResponse
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? SubTitle { get; set; }
        public string Description { get; set; } = string.Empty;
        public string? Requirements { get; set; }
        public int? MinAge { get; set; }
        public int? MaxAge { get; set; }
        public string? Address { get; set; }
        public string? GoogleMapLinkAddress { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? ContactEmail { get; set; }
        public string? ContactPhone { get; set; }
        public bool IsCertified { get; set; }
        public UrgencyLevel Urgency { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
