using API.Domain.Common.Model;

namespace API.Domain.Model.Shelter
{
    public class PetTrait : BaseModel
    {
        public Guid PetId { get; set; }
        public Pet Pet { get; set; } = null!;

        public Guid TraitId { get; set; }
        public Trait Trait { get; set; } = null!;
    }
}
