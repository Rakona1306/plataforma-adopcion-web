using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Features.Bussiness.PricingSponsors.Dtos
{
    public class CreatePricingSponsor
    {
        [Required]
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        [Required]
        public decimal ListPrice { get; set; }
        [Required]
        public decimal Price { get; set; }
        public string Currency { get; set; } = "PEN";
        public bool IsRelevant { get; set; } = false;
        public bool IsActive { get; set; } = true;
    }
}