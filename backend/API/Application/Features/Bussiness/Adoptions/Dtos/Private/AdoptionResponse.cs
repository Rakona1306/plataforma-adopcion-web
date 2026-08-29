using API.Application.Features.Bussiness.Adoptions.Dtos.Relations;
using API.Domain.Model.Bussiness;

namespace API.Application.Features.Bussiness.Adoptions.Dtos.Private
{
    public class AdoptionResponse
    {
        // === Identificación ===
        public int Id { get; set; }

        // === Solicitud de adopción ===
        public int RequestAdoptionId { get; set; }

        // === Información de la adopción ===
        public DateTime AdoptionDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? Observations { get; set; }

        // === Auditoría ===
        public DateTime CreatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime LastUpdatedAt { get; set; }
        public Guid? UpdatedBy { get; set; }

        public Adop_RequestAdoptionResponse RequestAdoption { get; set; } = null!;
    }
}