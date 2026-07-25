using API.Domain.Common.Model;

namespace API.Domain.Model.Bussiness
{
    public class Donation : BaseModelInt
    {
        public int RequestDonationId { get; set; }
        public DateTime DonationDate { get; set; }

        public ICollection<DonationFollowUp> FollowUps { get; set; } = new List<DonationFollowUp>();
        public RequestDonation RequestDonation { get; set; } = null!;
    }
}
