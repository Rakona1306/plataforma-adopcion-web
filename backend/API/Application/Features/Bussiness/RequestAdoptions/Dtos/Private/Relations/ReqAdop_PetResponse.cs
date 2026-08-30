using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Features.Bussiness.RequestAdoptions.Dtos.Private.Relations
{
    public class ReqAdop_PetResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ReqAdop_SpecieResponse? Specie { get; set; }
        public List<ReqAdop_BreedResponse> Breeds { get; set; } = new();
    }
}