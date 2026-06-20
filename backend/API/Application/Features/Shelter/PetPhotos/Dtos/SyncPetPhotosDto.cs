namespace API.Application.Features.Shelter.PetPhotos.Dtos
{
    // DTO para las nuevas fotos
    public class PetPhotoUploadDto
    {
        public IFormFile File { get; set; } = null!;
    }

    public class SyncPetPhotosDto
    {
        public List<PetPhotoUploadDto> PhotosToAdd { get; set; } = [];
        public List<Guid> PhotoIdsToRemove { get; set; } = [];
        public Guid? NewMainPhotoId { get; set; }
    }
}
