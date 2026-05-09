using API.Domain.Common.Model;

namespace API.Domain.Model.Organization
{
    public class Role: BaseModel
    {
        public string Name { get; set; } = string.Empty;
        public string? Description {  get; set; }
        public bool NotDelete { get; set; } = false;
        public bool ToDashboard { get; set; } = true;
        public ICollection<User> Users { get; set; } = [];
    }
}
