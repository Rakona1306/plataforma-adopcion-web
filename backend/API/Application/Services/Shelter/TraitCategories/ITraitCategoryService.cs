using API.Application.Common.Services;
using API.Application.Features.Shelter.TraitCategories.Dtos;

namespace API.Application.Services.Shelter.TraitCategories
{
    public interface ITraitCategoryService : IBaseService<TraitCategoryResponse, CreateTraitCategoryDto, UpdateTraitCategoryDto, TraitCategoryFilterDto>
    {

    }
}
