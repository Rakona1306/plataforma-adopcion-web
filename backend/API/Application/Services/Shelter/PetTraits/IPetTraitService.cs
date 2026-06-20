using API.Application.Common.Services;
using API.Application.Features.Shelter.PetTraits.Dtos;

namespace API.Application.Services.Shelter.PetTraits
{
    public interface IPetTraitService
    : IBaseService<
        PetTraitResponse,
        CreatePetTraitDto,
        UpdatePetTraitDto,
        PetTraitFilterDto>
    {
        Task<PetTraitResponse?>
            GetByIdAsync(
                Guid petId,
                Guid traitId
            );

        Task<PetTraitResponse>
            UpdateAsync(
                Guid petId,
                Guid traitId,
                UpdatePetTraitDto dto,
                Guid? userId = null
            );

        Task DeleteAsync(
            Guid petId,
            Guid traitId,
            Guid? userId = null
        );
    }
}
