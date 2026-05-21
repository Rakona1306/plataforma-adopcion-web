namespace API.Application.Features.Shelter.TraitCategories.Dtos
{
    public class CreateTraitCategoryDto
    {
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }
    }
}
