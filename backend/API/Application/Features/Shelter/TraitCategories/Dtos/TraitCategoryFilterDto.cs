namespace API.Application.Features.Shelter.TraitCategories.Dtos
{
    public class TraitCategoryFilterDto
    {
        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public string? Search { get; set; }
    }
}
