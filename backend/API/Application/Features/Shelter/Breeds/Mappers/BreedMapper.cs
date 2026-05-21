using API.Application.Features.Shelter.Breeds.Dtos;
using API.Domain.Model.Shelter;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Shelter.Breeds.Mappers
{
    [Mapper]
    public partial class BreedMapper
    {
        public partial Breed ToEntity(
            CreateBreedDto dto
        );

        public partial void Update(
            UpdateBreedDto dto,
            [MappingTarget] Breed entity
        );

        [MapProperty(
            nameof(Breed.Species.Name),
            nameof(BreedResponse.SpeciesName)
        )]
        public partial BreedResponse ToResponse(
            Breed entity
        );

        public partial List<BreedResponse>
            ToResponseList(
                List<Breed> entities
            );
    }
}
