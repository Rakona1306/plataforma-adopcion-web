using API.Application.Features.Shelter.TraitCategories.Dtos;
using API.Domain.Model.Shelter;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Shelter.TraitCategories.Mappers
{
    [Mapper]
    public partial class TraitCategoryMapper
    {
        public partial TraitCategory ToEntity(
            CreateTraitCategoryDto dto
        );

        public partial void Update(
            UpdateTraitCategoryDto dto,
            [MappingTarget] TraitCategory entity
        );

        [MapProperty(
            nameof(TraitCategory.Traits.Count),
            nameof(TraitCategoryResponse.TraitsCount)
        )]
        public partial TraitCategoryResponse ToResponse(
            TraitCategory entity
        );

        public partial List<TraitCategoryResponse>
            ToResponseList(
                List<TraitCategory> entities
            );
    }
}
