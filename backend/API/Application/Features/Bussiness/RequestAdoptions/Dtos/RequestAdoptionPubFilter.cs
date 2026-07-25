using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Model.Enums;

namespace API.Application.Features.Bussiness.RequestAdoptions.Dtos
{
    public class RequestAdoptionPubFilter
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public RequestStatus? Status { get; set; }

        public string OrderBy { get; set; } = "CreatedAt";
        public bool IsDescending { get; set; } = true;
    }
}