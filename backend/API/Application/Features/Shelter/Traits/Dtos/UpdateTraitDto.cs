namespace API.Application.Features.Shelter.Traits.Dtos
{
    public class UpdateTraitDto
    {
        public string Name { get; set; } = string.Empty;

        public Guid CategoryId { get; set; }
    }
}
