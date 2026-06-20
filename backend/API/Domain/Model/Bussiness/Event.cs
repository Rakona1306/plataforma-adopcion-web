using API.Domain.Common.Model;
using API.Domain.Model.Enums;

namespace API.Domain.Model.Bussiness
{
    public class Event : BaseModel
    {
        public string Title { get; set; }
            = string.Empty;

        public string? Description { get; set; }

        public string Location { get; set; }
            = string.Empty;

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int MaxParticipants { get; set; }

        public bool IsActive { get; set; }
            = true;

        public string? BannerUrl { get; set; }

        public EventType Type { get; set; }

        public EventStatus Status { get; set; }

        public ICollection<EventVolunteer>
            Volunteers
        { get; set; } = [];

        public ICollection<EventPhoto>
            Photos
        { get; set; } = [];
    }
}
