using API.Domain.Common.Model;

namespace API.Domain.Model.Shelter
{
    public class TraitCategory : BaseModel
    {
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public ICollection<Trait> Traits { get; set; } = [];
    }
}
