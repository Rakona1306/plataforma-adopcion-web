namespace API.Application.Features.Shelter.PetPhotos.Dtos
{
    public class SyncPetPhotosRequest
    {
        // Los archivos vienen como una lista
        public List<IFormFile>? Files { get; set; }
        // Un array paralelo que indica si cada archivo es main
        public Guid? MainPhotoId { get; set; }
        // Los IDs de fotos a eliminar
        public List<Guid>? PhotoIdsToRemove { get; set; }
    }
}
