using API.Application.Features.Shelter.Pets.Dtos;
using API.Domain.Model.Shelter;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Shelter.Pets.Mappers
{
    [Mapper]
    public partial class PetMapper
    {
        [MapperIgnoreTarget(nameof(Pet.PetBreeds))]
        [MapperIgnoreTarget(nameof(Pet.PetTraits))]
        [MapperIgnoreTarget(nameof(Pet.Photos))]
        public partial Pet ToEntity(CreatePetDto dto);

        public partial void Update(
            UpdatePetDto dto,
            [MappingTarget] Pet entity
        );

        [MapProperty(nameof(Pet.Species.Name), nameof(PetResponse.Species))]
        public partial PetResponse ToResponse(Pet entity);

        public partial List<PetResponse> ToResponseList(
            List<Pet> entities
        );
    }
}
