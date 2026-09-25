using API.Application.Features.Shelter.PetPhotos.Dtos;
using API.Domain.Model.Shelter;
using AutoMapper;

namespace API.Application.Features.Shelter.PetPhotos.Mappers
{
    public class PetPhotoProfile : Profile
    {
        public PetPhotoProfile()
        {
            CreateMap<PetPhoto, OptionPetPhotoResponse>();
        }
    }
}
