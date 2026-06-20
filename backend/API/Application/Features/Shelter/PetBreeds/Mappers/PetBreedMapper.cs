using API.Application.Features.Shelter.PetBreeds.Dtos;
using API.Domain.Model.Shelter;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Shelter.PetBreeds.Mappers
{
    [Mapper]
    public partial class PetBreedMapper
    {
        public partial PetBreed ToEntity(
            CreatePetBreedDto dto
        );

        public partial void Update(
            UpdatePetBreedDto dto,
            [MappingTarget] PetBreed entity
        );

        [MapProperty(
            nameof(PetBreed.Pet.Name),
            nameof(PetBreedResponse.PetName)
        )]
        [MapProperty(
            nameof(PetBreed.Breed.Name),
            nameof(PetBreedResponse.BreedName)
        )]
        public partial PetBreedResponse ToResponse(
            PetBreed entity
        );

        public partial List<PetBreedResponse>
            ToResponseList(
                List<PetBreed> entities
            );
    }
}
