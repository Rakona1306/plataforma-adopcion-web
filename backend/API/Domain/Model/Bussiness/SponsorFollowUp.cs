using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Common.Model;

namespace API.Domain.Model.Bussiness
{
    public class SponsorFollowUp : BaseModelInt
    {
        public int SponsorId { get; set; }
        public DateTime FollowUpDate { get; set; }
        public Sponsor Sponsor { get; set; } = new();
        public bool IsPaid { get; set; }
        public string? Notes { get; set; } = null!;
    }
}