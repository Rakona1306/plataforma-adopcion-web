using API.Domain.Common.Model;

namespace API.Domain.Model.Shelter
{
    public class Pet : BaseModel
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string History { get; set; } = string.Empty;
        public int Age { get; set; }
    }
}
