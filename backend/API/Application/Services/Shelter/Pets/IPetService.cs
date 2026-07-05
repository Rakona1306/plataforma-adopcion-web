using API.Application.Common.Services;
using API.Application.Features.Shelter.Pets.Dtos;
using API.Domain.Common.Model;

namespace API.Application.Services.Shelter.Pets
{
    public interface IPetService : IBaseService<PetResponse, CreatePetDto, UpdatePetDto, PetFilterDto, PetResponse>
    {
        public Task<Paginate<PetResponse>> GetAllAdoptedAsync(PetFilterDto filter);
    }
}
