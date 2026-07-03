using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Features.Shelter.Breeds.Dtos.Public
{
    public class BreedPubFilterDto
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? SpecieId { get; set; }
        public string? Search { get; set; }
    }
}