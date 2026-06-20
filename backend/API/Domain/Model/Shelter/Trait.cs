using API.Domain.Common.Model;

namespace API.Domain.Model.Shelter
{
    public class Trait : BaseModel
    {
        public string Name { get; set; } = string.Empty;

        public ICollection<PetTrait> PetTraits { get; set; } = [];
    }
}
