using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Common.Model;

namespace API.Domain.Model.Bussiness
{
    public class VolunteerApplication : BaseModelInt
    {
        public string Title { get; set; } = string.Empty;
        public string? SubTitle { get; set; }
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

        [MaxLength(100)]
        public string? ContactEmail { get; set; }
        [MaxLength(20)]
        public string? ContactPhone { get; set; }
        public bool IsCertified { get; set; } = false;
        public UrgencyLevel Urgency { get; set; } = UrgencyLevel.NORMAL;
    }
    public enum UrgencyLevel
    {
        NORMAL = 0,
        LOW = 1,
        MEDIUM = 2,
        HIGH = 3,
        URGENT = 4
    }
}