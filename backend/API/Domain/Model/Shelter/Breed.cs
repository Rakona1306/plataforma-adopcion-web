using API.Domain.Common.Model;

namespace API.Domain.Model.Shelter
{
    public class Breed : BaseModel
    {
        public string Name { get; set; } = string.Empty;
        public Guid SpeciesId { get; set; }
        public Specie Species { get; set; } = null!;
        public ICollection<PetBreed> PetBreeds { get; set; } = [];
    }
}
