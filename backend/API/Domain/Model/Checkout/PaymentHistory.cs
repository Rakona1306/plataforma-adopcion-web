using API.Domain.Common.Model;
using API.Domain.Model.Enums;

namespace API.Domain.Model.Checkout
{
    public class PaymentHistory : BaseModel
    {
        public Guid UserId { get; set; }

        public User User { get; set; }
            = null!;

        public decimal Amount { get; set; }

        public string Currency { get; set; } = "PEN";

        public PaymentStatus Status { get; set; }

        public string Provider { get; set; }
            = string.Empty;

        public string? TransactionId { get; set; }

        public string? RawResponse { get; set; }
    }
}
