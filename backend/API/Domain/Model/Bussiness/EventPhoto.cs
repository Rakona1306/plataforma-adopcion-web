using API.Domain.Common.Model;

namespace API.Domain.Model.Bussiness
{
    public class EventPhoto : BaseModel
    {
        public Guid EventId { get; set; }

        public Event Event { get; set; }
            = null!;

        public string Url { get; set; }
            = string.Empty;

        public bool IsMain { get; set; }
    }
}
