
using API.Application.Features.Bussiness.RequestAdoptions.Dtos.Private.Relations;
using API.Application.Features.Organization.Users.Dtos;
using API.Application.Features.Shelter.Pets.Dtos;
using API.Domain.Model.Enums;

namespace API.Application.Features.Bussiness.RequestAdoptions.Dtos.Private
{
    public class RequestAdoptionResponse
    {
        // === Identificación ===
        public int Id { get; set; }

        // === Datos del solicitante ===
        public Guid UserId { get; set; }
        public ReqAdop_UserResponse User { get; set; } = null!;

        // === Datos de la mascota ===
        public Guid? PetId { get; set; }
        public ReqAdop_PetResponse? Pet { get; set; }

        // === Información del hogar ===
        public string HouseType { get; set; } = string.Empty;
        public bool HasOtherPets { get; set; }
        public bool HasChildren { get; set; }
        public bool AcceptHomeVisit { get; set; }

        // === Contacto ===
        public string District { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string? Reference { get; set; }

        // === Motivación ===
        public string Motivation { get; set; } = string.Empty;

        // === Estado ===
        public string Status { get; set; } = string.Empty;

        // === Revisión ===
        public DateTime? ReviewedAt { get; set; }
        public Guid? ReviewedBy { get; set; }
        public ReqAdop_UserResponse? Reviewer { get; set; }
        public string? ReviewComment { get; set; }

        // === Auditoría ===
        public DateTime CreatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime LastUpdatedAt { get; set; }
        public Guid? UpdatedBy { get; set; }
    }
}