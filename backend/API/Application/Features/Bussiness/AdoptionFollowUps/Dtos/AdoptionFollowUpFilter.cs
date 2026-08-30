using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Features.Bussiness.AdoptionFollowUps.Dtos
{
    public class AdoptionFollowUpFilter
    {
        public int? AdoptionId { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}