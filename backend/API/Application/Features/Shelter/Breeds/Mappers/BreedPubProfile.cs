using API.Application.Features.Shelter.Breeds.Dtos.Public;
using API.Domain.Model.Shelter;
using AutoMapper;

namespace API.Application.Features.Shelter.Breeds.Mappers
{
    public class BreedPubProfile : Profile
    {
        public BreedPubProfile()
        {
            CreateMap<Breed, BreedPubResponse>();
        }
    }
}