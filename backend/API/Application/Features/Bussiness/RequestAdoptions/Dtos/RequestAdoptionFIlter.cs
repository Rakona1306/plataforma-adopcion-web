using API.Domain.Model.Enums;

namespace API.Application.Features.Bussiness.RequestAdoptions.Dtos
{
    public class RequestAdoptionFilter
    {
        // === Paginación ===
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;

        // === Filtros por estado ===
        public RequestStatus? Status { get; set; }

        // === Filtros por relaciones ===
        public Guid? UserId { get; set; }
        public Guid? PetId { get; set; }
        public Guid? ReviewedById { get; set; }

        // === Filtros por fecha ===
        public DateTime? CreatedFrom { get; set; }
        public DateTime? CreatedTo { get; set; }
        public DateTime? ReviewedFrom { get; set; }
        public DateTime? ReviewedTo { get; set; }

        // === Filtros booleanos ===
        public bool? HasOtherPets { get; set; }
        public bool? HasChildren { get; set; }
        public bool? AcceptHomeVisit { get; set; }

        // === Filtros de texto ===
        public string? District { get; set; }
        public string? HouseType { get; set; }
        public string? Search { get; set; } // Búsqueda en motivation, district, etc.

        // === Ordenamiento ===
        public string OrderBy { get; set; } = "CreatedAt";
        public bool IsDescending { get; set; } = true;
    }
}