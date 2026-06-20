using API.Application.Features.Shelter.Species.Dtos;
using Riok.Mapperly.Abstractions;
using API.Domain.Model.Shelter;

namespace API.Application.Features.Shelter.Species.Mappers
{
    [Mapper]
    public partial class SpeciesMapper
    {
        public partial Specie ToEntity(
            CreateSpeciesDto dto
        );

        public partial void Update(
            UpdateSpeciesDto dto,
            [MappingTarget] Specie entity
        );

        public partial SpeciesResponse ToResponse(
            Specie entity
        );

        public partial List<SpeciesResponse> ToResponseList(
            List<Specie> entities
        );
    }
}
