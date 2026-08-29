using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Organization.Users.Dtos;
using API.Application.Features.Shelter.Pets.Dtos;
using API.Domain.Model.Enums;

namespace API.Application.Features.Bussiness.RequestAdoptions.Dtos.Private
{
    public class RequestAdoptionRelationResponse
    {
        public int Id { get; set; }
        public UserResponse User { get; set; } = null!;
        public PetResponse Pet { get; set; } = null!;
        public RequestStatus Status { get; set; }
        public string HouseType { get; set; } = string.Empty;
        public bool HasOtherPets { get; set; }
        public bool HasChildren { get; set; }
        public bool AcceptHomeVisit { get; set; }

        // === Contacto ===
        public string District { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string? Reference { get; set; }
    }
}