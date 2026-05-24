using API.Domain.Common.Model;

namespace API.Domain.Model.Bussiness
{
    public class EventVolunteer : BaseModel
    {
        public Guid EventId { get; set; }
        public Event Event { get; set; }  = null!;
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
        public DateTime JoinedAt { get; set; }
        public bool Attended { get; set; }
    }
}
