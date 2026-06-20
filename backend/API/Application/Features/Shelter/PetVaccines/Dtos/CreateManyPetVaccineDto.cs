using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Features.Shelter.PetVaccines.Dtos
{
    public class CreateManyPetVaccineDto
    {
        public Guid PetId { get; set; }
        public UpdatePetRelationDto Vaccines { get; set; } = new();
    }

    public class UpdatePetRelationDto
    {
        // Solo enviamos los IDs que se deben procesar
        public List<Guid> AddIds { get; set; } = [];
        public List<Guid> RemoveIds { get; set; } = [];
    }
}