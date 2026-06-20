namespace API.Application.Features.Shelter.Vaccines.Dtos
{
    public class VaccineResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
            = string.Empty;

        public DateTime CreatedAt { get; set; }
    }
}
