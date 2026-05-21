using API.Domain.Common.Model;
using API.Domain.Model.Enums;

namespace API.Domain.Model.Bussiness
{
    public class VolunteerApplication : BaseModel
    {
        public Guid UserId { get; set; }

        public User User { get; set; }
            = null!;

        public Guid VolunteerAreaId { get; set; }

        public VolunteerArea VolunteerArea { get; set; }
            = null!;

        public string Motivation { get; set; }
            = string.Empty;

        public VolunteerStatus Status { get; set; }

        public DateTime? ApprovedAt { get; set; }

        public Guid? ApprovedBy { get; set; }
    }
}
