namespace API.Application.Features.Shelter.PetPhotos.Dtos
{
    public class CreatePetPhotoDto
    {
        public Guid PetId { get; set; }

        public IFormFile File { get; set; } = null!;

        public bool IsMain { get; set; }
    }
}
