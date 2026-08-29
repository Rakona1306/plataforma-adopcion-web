using API.Domain.Common.Model;
using API.Domain.Model.Enums;
using API.Domain.Model.Organization;

namespace API.Domain.Model.Bussiness
{
    public class RequestDonation : BaseModelInt
    {
        public Guid UserId { get; set; }
        public string? Message { get; set; } = null!;
        public RequestStatus Status { get; set; } = RequestStatus.PENDIENTE;
        public DateTime? ReviewedAt { get; set; }
        public Guid? ReviewedBy { get; set; }
        public PaymentProvider Provider { get; set; }
        public string? ReviewComment { get; set; }
        public int? PlanDonationId { get; set; }
        public bool IsMonthly { get; set; }
        public bool IsYearly { get; set; }
        public bool IsOneTime { get; set; }
        public decimal Amount { get; set; }
        public string? Address { get; set; }

        public PricingDonation? PlanDonation { get; set; }
        public User? Reviewer { get; set; }
        public User? User { get; set; }
    }
}