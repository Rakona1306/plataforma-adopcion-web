using API.Application.Features.Shelter.Pets.Dtos;
using API.Application.Features.Shelter.Pets.Dtos.Private;
using API.Domain.Model.Shelter;
using AutoMapper;

namespace API.Application.Features.Shelter.Pets.Mappers
{
    public class PetProfile : Profile
    {
        public PetProfile()
        {
            // Mapeo Principal para Listados y Detalles
            CreateMap<Pet, PetResponse>()
                .ForMember(dest => dest.IsBirthday, opt => opt.MapFrom(src =>
                    src.BirthDate.HasValue
                    && src.BirthDate.Value.Month == DateTime.Today.Month
                    && src.BirthDate.Value.Day == DateTime.Today.Day))
                // Mapeo de colecciones anidadas para ProjectTo
                .ForMember(dest => dest.SpeciesName, opt => opt.MapFrom(src => src.Species != null ? src.Species.Name : string.Empty))
                .ForMember(dest => dest.Breeds, opt => opt.MapFrom(src => src.PetBreeds.Select(pb => pb.Breed)))
                .ForMember(dest => dest.Traits, opt => opt.MapFrom(src => src.PetTraits.Select(pt => pt.Trait)))
                .ForMember(dest => dest.Vaccines, opt => opt.MapFrom(src => src.PetVaccines.Select(pv => pv.Vaccine)))
                .ForMember(dest => dest.PhotoUrls, opt => opt.MapFrom(src => src.Photos));

            // Mapeo para "Más Solicitados" (el RequestCount se llena después del query)
            CreateMap<Pet, PetMostRequestedResponse>()
                .ForMember(dest => dest.RequestCount, opt => opt.Ignore())
                .ForMember(dest => dest.Photos, opt => opt.MapFrom(src => src.Photos));

            // Mapeos auxiliares
            CreateMap<Specie, SpecieItem>();
            CreateMap<PetPhoto, PetPhotoItem>();

            // DTOs a Entidad
            CreateMap<CreatePetDto, Pet>();
            CreateMap<UpdatePetDto, Pet>();
        }
    }
}