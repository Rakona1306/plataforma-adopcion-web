namespace API.Application.Features.Shelter.PetTraits.Dtos
{
    public class CreatePetTraitDto
    {
        public Guid PetId { get; set; }

        public Guid TraitId { get; set; }
    }
}
