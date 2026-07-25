using API.Domain.Common.Model;

namespace API.Domain.Model.Bussiness
{
    public class Adoption : BaseModelInt
    {
        public int RequestAdoptionId { get; set; }
        public DateTime AdoptionDate { get; set; }
        public RequestAdoption RequestAdoption { get; set; } = null!;
        public AdoptionStatus Status { get; set; } = AdoptionStatus.HABILITADA;
        public string? Observations { get; set; }

        public ICollection<AdoptionFollowUp> FollowUps { get; set; } = new List<AdoptionFollowUp>();
    }

    public enum AdoptionStatus
    {
        HABILITADA = 1,
        DESHABILITADA = 2
    }
}