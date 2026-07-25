using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Shelter.Pets.Dtos.Public;
using API.Domain.Model.Enums;

namespace API.Application.Features.Bussiness.RequestAdoptions.Dtos.Public
{
    public class RequestAdoptionPubResponse
    {
        public int Id { get; set; }

        // === Mascota (visible públicamente) ===
        public Guid? PetId { get; set; }
        public PetPubResponse? Pet { get; set; }

        // === Información general (sin datos personales) ===
        public string HouseType { get; set; } = string.Empty;
        public bool HasOtherPets { get; set; }
        public bool HasChildren { get; set; }
        public string District { get; set; } = string.Empty;

        // === Estado ===
        public RequestStatus Status { get; set; }

        // === Fechas ===
        public DateTime CreatedAt { get; set; }
        public DateTime? ReviewedAt { get; set; }
    }
}