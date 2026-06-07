using API.Application.Common.Services;
using API.Application.Features.Shelter.PetPhotos.Dtos;

namespace API.Application.Services.Shelter.PetPhotos
{
    public interface IPetPhotoService : IBaseService<PetPhotoResponse, CreatePetPhotoDto, UpdatePetPhotoDto, PetPhotoFilterDto>
    {
        public Task SyncPhotosAsync(Guid petId, SyncPetPhotosDto dto, Guid? userId = null);
    }
}
