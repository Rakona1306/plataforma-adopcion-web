using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Model.Enums;

namespace API.Application.Features.Bussiness.AdoptionDetails.Dtos
{
    public class ReviewAdoptionRequest
    {
        public RequestStatus Status { get; set; }

        public string? ReviewComment { get; set; }

    }
}