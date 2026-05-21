using API.Domain.Common.Model;
using API.Domain.Model.Enums;
using API.Domain.Model.Shelter;

namespace API.Domain.Model.Bussiness
{
    public class Request : BaseModel
    {
        // USER

        public Guid UserId { get; set; }

        public User User { get; set; }
            = null!;

        // PET (OPCIONAL)

        public Guid? PetId { get; set; }

        public Pet? Pet { get; set; }

        // TYPE

        public RequestType Type { get; set; }

        // STATUS

        public RequestStatus Status { get; set; }

        // COMMON

        public string Motivation { get; set; }
            = string.Empty;

        public string? Notes { get; set; }

        // ADOPTION

        public string? HouseType { get; set; }

        public bool? HasOtherPets { get; set; }

        public bool? HasChildren { get; set; }

        public bool? AcceptHomeVisit { get; set; }

        // DONATION

        public decimal? DonationAmount { get; set; }

        public bool? MonthlyDonation { get; set; }

        public string? DonationMessage { get; set; }

        // SPONSORSHIP

        public decimal? SponsorshipAmount { get; set; }

        public DateTime? SponsorshipStartDate { get; set; }

        // VOLUNTEER

        public Guid? VolunteerAreaId { get; set; }

        public VolunteerArea? VolunteerArea { get; set; }

        public string? Experience { get; set; }

        public int? AvailableHoursPerWeek { get; set; }

        // REVIEW

        public DateTime? ReviewedAt { get; set; }

        public Guid? ReviewedBy { get; set; }

        public User? Reviewer { get; set; }

        public string? ReviewComment { get; set; }
    }
}
