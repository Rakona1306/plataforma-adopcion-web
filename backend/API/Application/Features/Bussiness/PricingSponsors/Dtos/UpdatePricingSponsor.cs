using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Features.Bussiness.PricingSponsors.Dtos
{
    public class UpdatePricingSponsor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public decimal ListPrice { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; } = "PEN";
        public bool IsRelevant { get; set; }
        public bool IsActive { get; set; }
    }
}