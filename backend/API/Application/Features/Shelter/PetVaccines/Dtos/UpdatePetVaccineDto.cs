namespace API.Application.Features.Shelter.PetVaccines.Dtos
{
    public class UpdatePetVaccineDto
    {
        public Guid PetId { get; set; }
        public Guid VaccineId { get; set; }

        public DateTime AppliedDate { get; set; }

        public DateTime? ExpirationDate { get; set; }
    }
}
