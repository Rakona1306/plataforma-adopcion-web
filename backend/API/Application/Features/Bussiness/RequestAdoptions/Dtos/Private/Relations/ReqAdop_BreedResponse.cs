using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Features.Bussiness.RequestAdoptions.Dtos.Private.Relations
{
    public class ReqAdop_BreedResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}