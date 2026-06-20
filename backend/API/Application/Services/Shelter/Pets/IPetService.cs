using API.Application.Common.Services;
using API.Application.Features.Shelter.Pets.Dtos;

namespace API.Application.Services.Shelter.Pets
{
    public interface IPetService : IBaseService<PetResponse, CreatePetDto, UpdatePetDto, PetFilterDto>
    {
    }
}
