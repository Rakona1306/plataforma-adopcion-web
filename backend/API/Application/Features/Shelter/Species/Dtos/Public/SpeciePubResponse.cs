using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Features.Shelter.Species.Dtos.Public
{
    public class SpeciePubResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}