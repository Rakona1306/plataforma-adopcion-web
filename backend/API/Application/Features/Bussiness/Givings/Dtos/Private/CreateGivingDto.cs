using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Model.Bussiness;

namespace API.Application.Features.Bussiness.Givings.Dtos.Private
{
    public class CreateGivingDto
    {
        public string Name { get; set; } = null!;
        public GivingType Type { get; set; }
        public decimal? Amount { get; set; }
        public decimal? Quantity { get; set; }
        public MeasurementUnit? Unit { get; set; }
        public decimal? Kg { get; set; }
    }
}