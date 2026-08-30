using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Common.Model;

namespace API.Domain.Model.Bussiness
{
    public class PricingDonation : BaseModelInt
    {
        public int GivingId { get; set; }
        public Giving Giving { get; set; } = new();
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        [MaxLength(1000)]
        public string? Benefits { get; set; }
        public bool IsFeatured { get; set; } = false;
        public bool IsActive { get; set; } = true;
    }
}