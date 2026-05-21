namespace API.Application.Features.Shelter.PetVaccines.Dtos
{
    public class PetVaccineFilterDto
    {
        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public Guid? PetId { get; set; }

        public Guid? VaccineId { get; set; }

        public bool? Expired { get; set; }
    }
}
