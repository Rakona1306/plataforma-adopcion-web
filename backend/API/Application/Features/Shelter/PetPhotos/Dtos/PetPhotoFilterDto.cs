namespace API.Application.Features.Shelter.PetPhotos.Dtos
{
    public class PetPhotoFilterDto
    {
        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public Guid? PetId { get; set; }

        public bool? IsMain { get; set; }
    }
}
