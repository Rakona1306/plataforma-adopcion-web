using API.Application.Features.Shelter.Traits.Dtos;
using API.Domain.Model.Shelter;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Shelter.Traits.Mappers
{
    [Mapper]
    public partial class TraitMapper
    {
        public partial Trait ToEntity(
            CreateTraitDto dto
        );

        public partial void Update(
            UpdateTraitDto dto,
            [MappingTarget] Trait entity
        );

        public partial TraitResponse ToResponse(
            Trait entity
        );

        public partial List<TraitResponse>
            ToResponseList(
                List<Trait> entities
            );
    }
}
