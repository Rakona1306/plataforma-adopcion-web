using API.Application.Common.Services;
using API.Application.Features.Shelter.Vaccines.Dtos;

namespace API.Application.Services.Shelter.Vaccines
{
    public interface IVaccineService
    : IBaseService<
        VaccineResponse,
        CreateVaccineDto,
        UpdateVaccineDto,
        VaccineFilterDto,
        VaccineResponse>
    {
    }
}
