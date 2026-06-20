
using API.Domain.Common.Model;

namespace API.Domain.Model.Bussiness
{
    public class VolunteerArea : BaseModel
    {
        public string Name { get; set; }
            = string.Empty;

        public string? Description { get; set; }

        public ICollection<VolunteerApplication>
            Applications
        { get; set; } = [];
    }
}
