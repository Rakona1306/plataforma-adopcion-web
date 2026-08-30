using System.ComponentModel.DataAnnotations;
using API.Domain.Common.Model;
using API.Domain.Model.Enums;
using API.Domain.Model.Organization;
using API.Domain.Model.Shelter;

namespace API.Domain.Model.Bussiness
{
    public class RequestSponsor : BaseModelInt
    {
        public Guid UserId { get; set; }
        public Guid PetId { get; set; }
        public int PlanSponsorId { get; set; }
        public string? Message { get; set; } = null!;
        public RequestStatus Status { get; set; } = RequestStatus.PENDIENTE;
        public PaymentProvider Provider { get; set; } = PaymentProvider.PAYPAL;
        public SponsorMode Mode { get; set; } = SponsorMode.UNICO_PAGO;
        public DateTime? ReviewedAt { get; set; }
        public Guid? ReviewedBy { get; set; }
        public string? ReviewComment { get; set; }

        public User? Reviewer { get; set; }
        public User? User { get; set; }
        public Pet? Pet { get; set; }
        public PricingSponsor? PlanSponsor { get; set; }
    }
}