using System.ComponentModel.DataAnnotations;

namespace API.Application.Features.Bussiness.AdoptionDetails.Dtos
{
    public class UpdateReqAdoptionDetail
    {
        [StringLength(1000, MinimumLength = 10)]
        public string? Motivation { get; set; }

        [StringLength(150)]
        public string? District { get; set; }

        [Phone]
        public string? Phone { get; set; }

        [StringLength(500)]
        public string? Notes { get; set; }

        [StringLength(100)]
        public string? HouseType { get; set; }

        public bool? HasOtherPets { get; set; }
        public bool? HasChildren { get; set; }
        public bool? AcceptHomeVisit { get; set; }
    }
}

