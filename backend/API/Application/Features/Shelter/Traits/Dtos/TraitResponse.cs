namespace API.Application.Features.Shelter.Traits.Dtos
{
    public class TraitResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public Guid CategoryId { get; set; }

        public string CategoryName { get; set; }
            = string.Empty;

        public DateTime CreatedAt { get; set; }
    }
}
