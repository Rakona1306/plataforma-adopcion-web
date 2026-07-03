

using API.Domain.Common.Model;
using API.Domain.Model.Shelter;

namespace API.Domain.Model.System
{
    public class CollectionPet : BaseModel
    {
        public Guid PetId { get; set; }

        public Guid CollectionId { get; set; }

        public Pet Pet { get; set; }

        public Collection Collection { get; set; }
    }
}