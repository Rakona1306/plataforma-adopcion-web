namespace API.Application.Features.Shelter.PetPhotos.Dtos
{
    public class UpdatePetPhotoDto
    {
        public IFormFile? File { get; set; }
        public bool IsMain { get; set; }
    }
}
