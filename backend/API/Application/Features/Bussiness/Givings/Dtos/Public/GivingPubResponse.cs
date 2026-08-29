using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Features.Bussiness.Givings.Dtos.Public
{
    public class GivingPubResponse
    {
        public int Id { get; set; }
        public decimal? Amount { get; set; }
        public string Name { get; set; } = null!;
        public string Type { get; set; } = null!; // Se expone como String para facilitar lectura en Frontend
        public decimal? Quantity { get; set; }
        public string? Unit { get; set; }
        public decimal? Kg { get; set; }
    }
}