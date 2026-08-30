using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            CreateMap<Pet, PetResponse>();

            CreateMap<Pet, PetMostRequestedResponse>()
                .ForMember(dest => dest.RequestCount, opt => opt.Ignore());

            CreateMap<Specie, SpecieItem>();

            CreateMap<PetPhoto, PetPhotoItem>();
        }
    }
}