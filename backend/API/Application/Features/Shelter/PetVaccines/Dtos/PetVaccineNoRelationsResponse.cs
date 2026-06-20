namespace API.Application.Features.Shelter.PetVaccines.Dtos
{
    public class PetVaccineNoRelationsResponse
    {
        public Guid Id { get; set; }
        public Guid PetId { get; set; }
        public Guid VaccineId { get; set; }
        public DateTime ApplicationDate { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public bool IsExpired { get; set; }
    }
}