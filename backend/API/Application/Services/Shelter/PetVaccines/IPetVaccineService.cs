using API.Application.Common.Services;
using API.Application.Features.Shelter.PetVaccines.Dtos;

namespace API.Application.Services.Shelter.PetVaccines
{
    public interface IPetVaccineService
    : IBaseService<
        PetVaccineResponse,
        CreatePetVaccineDto,
        UpdatePetVaccineDto,
        PetVaccineFilterDto>
    {
        Task<PetVaccineResponse?>
            GetByIdAsync(
                Guid petId,
                Guid vaccineId
            );

        Task<PetVaccineResponse>
            UpdateAsync(
                Guid petId,
                Guid vaccineId,
                UpdatePetVaccineDto dto,
                Guid? userId = null
            );

        Task DeleteAsync(
            Guid petId,
            Guid vaccineId,
            Guid? userId = null
        );
    }
}
