using API.Application.Common.Services;
using API.Application.Features.Shelter.Species.Dtos;

namespace API.Application.Services.Shelter.Species
{
    public interface ISpeciesService: IBaseService<SpeciesResponse, CreateSpeciesDto, UpdateSpeciesDto, SpeciesFilterDto>
    {
    }
}
