using API.Application.Features.Shelter.Species.Dtos;
using API.Application.Features.Shelter.Species.Dtos.Public;
using API.Domain.Model.Shelter;
using AutoMapper;

namespace API.Application.Features.Shelter.Species.Mappers
{
    public class SpeciesProfile : Profile
    {
        public SpeciesProfile()
        {
            CreateMap<Specie, SpeciesResponse>();
            CreateMap<CreateSpeciesDto, Specie>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedAt, opt => opt.Ignore());

            CreateMap<Specie, SpeciePubResponse>();

            CreateMap<UpdateSpeciesDto, Specie>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}