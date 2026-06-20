using API.Application.Common.Services;
using API.Application.Features.Shelter.Traits.Dtos;

namespace API.Application.Services.Shelter.Traits
{
    public interface ITraitService
    : IBaseService<
        TraitResponse,
        CreateTraitDto,
        UpdateTraitDto,
        TraitFilterDto>
    {
    }
}
