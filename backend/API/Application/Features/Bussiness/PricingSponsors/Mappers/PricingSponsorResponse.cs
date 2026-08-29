using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Common.Model;

namespace API.Application.Features.Bussiness.PricingSponsors.Mappers
{
    // PRIVATE
    public class PricingSponsorResponse : BaseModelInt
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public decimal ListPrice { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; } = "PEN";
        public bool IsRelevant { get; set; }
        public bool IsActive { get; set; }
    }

    // PUBLIC
}