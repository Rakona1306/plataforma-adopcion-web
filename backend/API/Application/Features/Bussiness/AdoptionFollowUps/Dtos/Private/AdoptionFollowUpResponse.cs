using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Features.Bussiness.AdoptionFollowUps.Dtos.Private
{
    public class AdoptionFollowUpResponse
    {
        public int Id { get; set; }
        public int AdoptionId { get; set; }
        public DateTime FollowUpDate { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
    }
}