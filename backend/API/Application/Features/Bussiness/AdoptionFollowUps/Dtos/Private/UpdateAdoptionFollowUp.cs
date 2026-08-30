using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Model.Bussiness;

namespace API.Application.Features.Bussiness.AdoptionFollowUps.Dtos.Private
{
    public class UpdateAdoptionFollowUp
    {
        public int Id { get; set; }
        public int AdoptionId { get; set; }
        public DateTime FollowUpDate { get; set; }
        public FollowUpType Type { get; set; }
        public FollowUpStatus Status { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
    }
}