using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Features.Bussiness.RequestAdoptions.Dtos.Private
{
    public class UpdateRequestAdoption
    {
        [Required]
        public int Id { get; set; }
        public Guid PetId { get; set; }

        [Required]
        [MaxLength(50)]
        public string HouseType { get; set; } = string.Empty;
        public bool HasOtherPets { get; set; }
        public bool HasChildren { get; set; }
        public bool AcceptHomeVisit { get; set; }
        public string Address { get; set; } = string.Empty;
        public string? Reference { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string District { get; set; } = string.Empty;

        [Required]
        [Phone]
        [MaxLength(15)]
        public string Phone { get; set; } = string.Empty;

        [Required]
        [MaxLength(2000)]
        public string Motivation { get; set; } = string.Empty;
    }
}