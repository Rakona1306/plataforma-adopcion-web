using API.Domain.Common.Model;

namespace API.Domain.Model.System
{
    public class Collection : BaseModel
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public ICollection<CollectionPet> CCollectionPets { get; set; } = [];
    }
}