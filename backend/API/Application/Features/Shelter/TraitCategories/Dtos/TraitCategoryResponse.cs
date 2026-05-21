namespace API.Application.Features.Shelter.TraitCategories.Dtos
{
    public class TraitCategoryResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public int TraitsCount { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
