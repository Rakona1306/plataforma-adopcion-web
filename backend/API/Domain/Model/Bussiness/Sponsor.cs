using API.Domain.Common.Model;
namespace API.Domain.Model.Bussiness
{
    public class Sponsor : BaseModelInt
    {
        public int RequestSponsorId { get; set; }
        public RequestSponsor RequestSponsor { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public List<SponsorFollowUp> SponsorFollowUps { get; set; } = new List<SponsorFollowUp>();
    }

    public enum SponsorMode
    {
        MENSUAL = 1,
        UNICO_PAGO = 2,
    }
}