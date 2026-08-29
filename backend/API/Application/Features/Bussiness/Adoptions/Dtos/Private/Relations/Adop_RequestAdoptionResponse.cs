using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Model.Enums;

namespace API.Application.Features.Bussiness.Adoptions.Dtos.Relations
{
    public class Adop_RequestAdoptionResponse
    {
        public int Id { get; set; }
        public Adop_UserResponse User { get; set; } = null!;
        public Adop_PetResponse Pet { get; set; } = null!;
        public string Status { get; set; } = string.Empty;
        public string HouseType { get; set; } = string.Empty;
        public bool HasOtherPets { get; set; }
        public bool HasChildren { get; set; }
        public bool AcceptHomeVisit { get; set; }

        // === Contacto ===
        public string District { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string? Reference { get; set; }

        public Adop_UserResponse Reviewer { get; set; } = null!;
    }
}