using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Model.Bussiness;

namespace API.Application.Features.Bussiness.Adoptions.Dtos
{
    public class AdoptionFilter
    {
        // Paginación
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;

        // Filtros
        public AdoptionStatus? Status { get; set; }
        public int? RequestAdoptionId { get; set; }
        public Guid? UserId { get; set; } // Para filtrar por el dueño de la RequestAdoption

        // Fechas
        public DateTime? AdoptionDateFrom { get; set; }
        public DateTime? AdoptionDateTo { get; set; }

        // Ordenamiento
        public string OrderBy { get; set; } = "AdoptionDate";
        public bool IsDescending { get; set; } = true;
    }
}