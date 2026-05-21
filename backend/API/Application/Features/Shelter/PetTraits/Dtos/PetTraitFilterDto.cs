namespace API.Application.Features.Shelter.PetTraits.Dtos
{
    public class PetTraitFilterDto
    {
        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public Guid? PetId { get; set; }

        public Guid? TraitId { get; set; }
    }
}
