using API.Application.Features.Shelter.PetTraits.Dtos;
using API.Domain.Model.Shelter;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Shelter.PetTraits.Mappers
{
    [Mapper]
    public partial class PetTraitMapper
    {
        public partial PetTrait ToEntity(
            CreatePetTraitDto dto
        );

        [MapProperty(
            nameof(PetTrait.Trait.Name),
            nameof(PetTraitResponse.TraitName)
        )]
        [MapProperty(
            nameof(PetTrait.Trait.CategoryId),
            nameof(PetTraitResponse.TraitCategoryId)
        )]
        [MapProperty(
            nameof(PetTrait.Trait.Category.Name),
            nameof(PetTraitResponse.TraitCategoryName)
        )]
        public partial PetTraitResponse ToResponse(
            PetTrait entity
        );

        public partial List<PetTraitResponse>
            ToResponseList(
                List<PetTrait> entities
            );
    }
}
