using API.Domain.Common.Model;

namespace API.Domain.Model.Shelter
{
    public class PetSponsor : BaseModel
    {
        public Guid UserId { get; set; }

        public User User { get; set; }
            = null!;

        public Guid PetId { get; set; }

        public Pet Pet { get; set; }
            = null!;

        public decimal MonthlyAmount { get; set; }

        public SponsorshipStatus Status { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string? Notes { get; set; }
    }
}
