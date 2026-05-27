using API.Application.Features.Shelter.PetTraits.Dtos;
using API.Domain.Common.Model;
using API.Domain.Model.Shelter;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Shelter.PetTraits.Mappers
{
    [Mapper]
    public partial class PetTraitMapper
    {
        // 1. Ignoramos las propiedades de BaseModel que sobran
        [MapperIgnoreSource(nameof(BaseModel.CreatedAt))]
        [MapperIgnoreSource(nameof(BaseModel.CreatedBy))]
        [MapperIgnoreSource(nameof(BaseModel.LastUpdatedAt))]
        [MapperIgnoreSource(nameof(BaseModel.UpdatedBy))]
        [MapperIgnoreSource(nameof(PetTrait.Pet))] // Si no está en el DTO, ignóralo

        // 2. Mapeo explícito usando la notación de puntos
        [MapProperty(nameof(PetTrait.Trait) + "." + nameof(Trait.Name), nameof(PetTraitResponse.TraitName))]
        [MapProperty(nameof(PetTrait.Trait) + "." + nameof(Trait.CategoryId), nameof(PetTraitResponse.TraitCategoryId))]
        [MapProperty(nameof(PetTrait.Trait) + "." + nameof(Trait.Category) + "." + nameof(TraitCategory.Name), nameof(PetTraitResponse.TraitCategoryName))]
        public partial PetTraitResponse ToResponse(PetTrait entity);

        [MapperIgnoreTarget(nameof(PetTrait.Pet))]
        [MapperIgnoreTarget(nameof(PetTrait.Trait))]
        [MapperIgnoreTarget(nameof(PetTrait.Id))]
        [MapperIgnoreTarget(nameof(PetTrait.CreatedAt))]
        [MapperIgnoreTarget(nameof(PetTrait.CreatedBy))]
        [MapperIgnoreTarget(nameof(PetTrait.LastUpdatedAt))]
        [MapperIgnoreTarget(nameof(PetTrait.UpdatedBy))]
        public partial PetTrait ToEntity(CreatePetTraitDto dto);

        public partial List<PetTraitResponse> ToResponseList(List<PetTrait> entities);
    }
}
