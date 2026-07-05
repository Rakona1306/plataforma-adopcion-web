using System.ComponentModel.DataAnnotations;
using API.Domain.Model.Enums;

namespace API.Application.Features.Bussiness.AdoptionDetails.Dtos
{
    public class CreateReqAdoptionDetail
    {
        public Guid UserId { get; set; }
        public RequestType Type { get; set; } = RequestType.ADOPCION;
        public RequestStatus Status { get; set; } = RequestStatus.PENDIENTE;
        public string Motivation { get; set; } = string.Empty;
        public string District { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        [Required]
        public Guid PetId { get; set; }
        public string? Notes { get; set; }


        // ──────────────────── DATOS DE ADOPCIÓN ────────────────────

        public string HouseType { get; set; } = string.Empty;
        public bool HasOtherPets { get; set; }
        public bool HasChildren { get; set; }
        public bool AcceptHomeVisit { get; set; }
    }
}