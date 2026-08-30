using API.Domain.Common.Model;
using API.Domain.Model.Organization;

namespace API.Domain.Model.Bussiness
{
    public class RequestVolunteer : BaseModelInt
    {
        public int VolunteerApplicationId { get; set; }
        public DateTime RequestDate { get; set; }
        public VolunteerRequestStatus Status { get; set; } = VolunteerRequestStatus.REVISANDO;
        public Guid UserId { get; set; }
        public string? Message { get; set; } = null!;
        public DateTime? ReviewedAt { get; set; }
        public Guid? ReviewedBy { get; set; }
        public string? ReviewComment { get; set; }

        public User User { get; set; } = null!;
        public User? Reviewer { get; set; }
        public VolunteerApplication VolunteerApplication { get; set; } = null!;
    }

    public enum VolunteerRequestStatus
    {
        REVISANDO = 1,
        APROBADO = 2,
        RECHAZADO = 3
    }
}