using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Features.Bussiness.Adoptions.Dtos.Relations
{
    public class Adop_PetResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}