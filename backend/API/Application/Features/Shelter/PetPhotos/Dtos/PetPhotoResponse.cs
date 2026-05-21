namespace API.Application.Features.Shelter.PetPhotos.Dtos
{
    public class PetPhotoResponse
    {
        public Guid Id { get; set; }

        public string Url { get; set; } = string.Empty;

        public bool IsMain { get; set; }

        public Guid PetId { get; set; }
    }
}
