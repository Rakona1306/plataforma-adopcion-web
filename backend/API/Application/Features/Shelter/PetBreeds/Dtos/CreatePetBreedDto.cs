namespace API.Application.Features.Shelter.PetBreeds.Dtos
{
    public class CreatePetBreedDto
    {
        public Guid PetId { get; set; }

        public Guid BreedId { get; set; }

        public int Percentage { get; set; }
    }
}
