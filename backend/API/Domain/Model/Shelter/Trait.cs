using API.Domain.Common.Model;

namespace API.Domain.Model.Shelter
{
    public class Trait : BaseModel
    {
        public string Name { get; set; } = string.Empty;
        public Guid CategoryId { get; set; }

        public TraitCategory Category { get; set; }

        public ICollection<PetTrait> PetTraits { get; set; } = [];
    }
}
