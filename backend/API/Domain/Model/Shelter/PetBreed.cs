using API.Domain.Common.Model;

namespace API.Domain.Model.Shelter
{
    public class PetBreed : BaseModel
    {
        public Guid PetId { get; set; }
        public Pet Pet { get; set; } = null!;

        public Guid BreedId { get; set; }
        public Breed Breed { get; set; } = null!;

        // opcional
        public int Percentage { get; set; }
    }
}
