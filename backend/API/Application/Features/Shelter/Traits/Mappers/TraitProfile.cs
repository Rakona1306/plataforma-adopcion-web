using API.Application.Features.Shelter.Traits.Dtos;
using API.Domain.Model.Shelter;
using AutoMapper;

namespace API.Application.Features.Shelter.Traits.Mappers
{
    public class TraitProfile : Profile
    {
        public TraitProfile()
        {
            CreateMap<Trait, TraitResponse>();
            CreateMap<Trait, OptionTraitResponse>();
        }
    }
}
