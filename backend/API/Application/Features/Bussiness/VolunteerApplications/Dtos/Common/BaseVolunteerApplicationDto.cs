using API.Domain.Model.Bussiness;
using System.ComponentModel.DataAnnotations;

namespace API.Application.Features.Bussiness.VolunteerApplications.Dtos.Common
{
    public abstract class BaseVolunteerApplicationDto
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? SubTitle { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string? Requirements { get; set; }

        [Range(0, 100)]
        public int? MinAge { get; set; }

        [Range(0, 100)]
        public int? MaxAge { get; set; }

        [MaxLength(200)]
        public string? Address { get; set; }

        public string? GoogleMapLinkAddress { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        [EmailAddress]
        [MaxLength(100)]
        public string? ContactEmail { get; set; }

        [Phone]
        [MaxLength(20)]
        public string? ContactPhone { get; set; }

        public bool IsCertified { get; set; } = false;

        public UrgencyLevel Urgency { get; set; } = UrgencyLevel.NORMAL;
    }
}
