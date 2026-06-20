namespace API.Application.Features.Shelter.PetBreeds.Dtos
{
    public class PetBreedResponse
    {
        public Guid PetId { get; set; }

        public string PetName { get; set; }
            = string.Empty;

        public Guid BreedId { get; set; }

        public string BreedName { get; set; }
            = string.Empty;

        public int Percentage { get; set; }
    }
}
