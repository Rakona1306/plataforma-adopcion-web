using API.Application.Features.Shelter.Breeds.Dtos;
using API.Application.Features.Shelter.Breeds.Dtos.Public;
using API.Domain.Model.Shelter;
using AutoMapper;

namespace API.Application.Features.Shelter.Breeds.Mappers
{
    public class BreedProfile : Profile
    {
        public BreedProfile()
        {
            // --- Mapeos de Entidad a Response ---

            CreateMap<Breed, BreedResponse>()
                .ForMember(dest => dest.SpeciesName, opt => opt.MapFrom(src => src.Species != null ? src.Species.Name : string.Empty));

            CreateMap<Breed, OptionBreedResponse>();


            // --- Mapeos de DTO a Entidad ---

            CreateMap<CreateBreedDto, Breed>();

            CreateMap<UpdateBreedDto, Breed>();

            CreateMap<Breed, OptionBreedResponse>();


            // --- Mapeo de Filtros (Opcional) ---
            // Convierte el filtro público (SpecieId) al filtro interno (SpeciesId)
            CreateMap<BreedPubFilterDto, BreedFilterDto>()
                .ForMember(dest => dest.SpeciesId, opt => opt.MapFrom(src => src.SpecieId));
        }
    }
}
