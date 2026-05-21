namespace API.Application.Features.Shelter.PetTraits.Dtos
{
    public class PetTraitResponse
    {
        public Guid PetId { get; set; }

        public Guid TraitId { get; set; }

        public string TraitName { get; set; }
            = string.Empty;

        public Guid TraitCategoryId { get; set; }

        public string TraitCategoryName { get; set; }
            = string.Empty;
    }
}
