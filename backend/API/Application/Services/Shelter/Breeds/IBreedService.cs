using API.Application.Common.Services;
using API.Application.Features.Shelter.Breeds.Dtos;

namespace API.Application.Services.Shelter.Breeds
{
    public interface IBreedService : IBaseService<
        BreedResponse,
        CreateBreedDto,
        UpdateBreedDto,
        BreedFilterDto,
        BreedResponse>
    {
    }
}
