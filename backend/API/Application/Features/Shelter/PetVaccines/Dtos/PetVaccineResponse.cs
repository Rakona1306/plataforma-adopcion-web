namespace API.Application.Features.Shelter.PetVaccines.Dtos
{
    public class PetVaccineResponse
    {
        public Guid PetId { get; set; }

        public Guid VaccineId { get; set; }

        public string VaccineName { get; set; }
            = string.Empty;

        public DateTime AppliedDate { get; set; }

        public DateTime? ExpirationDate { get; set; }

        public bool IsExpired { get; set; }
    }
}
