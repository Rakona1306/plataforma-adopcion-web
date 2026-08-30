using API.Domain.Common.Model;
namespace API.Domain.Model.Bussiness
{
    public class DonationFollowUp : BaseModelInt
    {
        public int DonationId { get; set; }
        public DateTime FollowUpDate { get; set; }
        public Donation Donation { get; set; } = new();
        public bool IsPaid { get; set; }
        public string? Notes { get; set; } = null!;
    }
}