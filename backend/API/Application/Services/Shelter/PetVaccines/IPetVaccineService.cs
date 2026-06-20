using Amazon.S3.Model;
using API.Application.Common.Services;
using API.Application.Features.Shelter.PetVaccines.Dtos;

namespace API.Application.Services.Shelter.PetVaccines
{
    public interface IPetVaccineService
    : IBaseService<
        PetVaccineResponse,
        CreatePetVaccineDto,
        UpdatePetVaccineDto,
        PetVaccineFilterDto,
        PetVaccineNoRelationsResponse>
    {
        Task<PetVaccineResponse?> GetByIdAsync(Guid petId, Guid vaccineId);

        Task DeleteByPetIdAndVaccineIdAsync(Guid petId, Guid vaccineId, Guid? userId = null);
    }
}
