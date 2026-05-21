using API.Application.Features.Shelter.PetPhotos.Dtos;
using API.Domain.Model.Shelter;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Shelter.PetPhotos.Mappers
{
    [Mapper]
    public partial class PetPhotoMapper
    {
        public partial PetPhoto ToEntity(CreatePetPhotoDto dto);
        public partial PetPhotoResponse ToResponse(PetPhoto entity);
        public partial void Update(
            UpdatePetPhotoDto dto,
            [MappingTarget] PetPhoto entity
        );
        public partial List<PetPhotoResponse> ToResponseList(List<PetPhoto> entities);
    }
}
