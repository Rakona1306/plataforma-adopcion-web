using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Bussiness.Adoptions.Dtos.Private;
using API.Application.Features.Bussiness.Adoptions.Dtos.Private.Relations;
using API.Application.Features.Bussiness.Adoptions.Dtos.Relations;
using API.Domain.Model.Bussiness;
using API.Domain.Model.Organization;
using API.Domain.Model.Shelter;
using AutoMapper;

namespace API.Application.Features.Bussiness.Adoptions.Mappers
{
    public class AdoptionProfile : Profile
    {
        public AdoptionProfile()
        {
            CreateMap<UpdateAdoptionStatus, Adoption>()
               .ForMember(dest => dest.Id, opt => opt.Ignore())
               .ForMember(dest => dest.RequestAdoptionId, opt => opt.Ignore())
               .ForMember(dest => dest.AdoptionDate, opt => opt.Ignore())
               .ForMember(dest => dest.RequestAdoption, opt => opt.Ignore())
               .ForMember(dest => dest.FollowUps, opt => opt.Ignore())
               .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
               .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
               .ForMember(dest => dest.LastUpdatedAt, opt => opt.Ignore())
               .ForMember(dest => dest.UpdatedBy, opt => opt.Ignore());

            CreateMap<Adoption, AdoptionResponse>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));

            CreateMap<User, Adop_UserResponse>();
            CreateMap<Pet, Adop_PetResponse>()
                .ForMember(dest => dest.Species, opt => opt.MapFrom(src => src.Species))
                .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Gender.ToString()))
                .ForMember(dest => dest.Size, opt => opt.MapFrom(src => src.Size.ToString()))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));

            CreateMap<Specie, Adop_SpecieResponse>();
            CreateMap<RequestAdoption, Adop_RequestAdoptionResponse>()
                .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User))
                .ForMember(dest => dest.Pet, opt => opt.MapFrom(src => src.Pet))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));
        }
    }
}