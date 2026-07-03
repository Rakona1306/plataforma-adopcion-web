using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Features.Shelter.Breeds.Dtos.Public
{
    public class BreedPubResponse
    {
        public Guid Id { set; get; }
        public string Name { set; get; } = string.Empty;
    }
}