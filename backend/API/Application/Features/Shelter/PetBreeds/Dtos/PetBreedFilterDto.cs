namespace API.Application.Features.Shelter.PetBreeds.Dtos
{
    public class PetBreedFilterDto
    {
        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public Guid? PetId { get; set; }

        public Guid? BreedId { get; set; }
    }
}
