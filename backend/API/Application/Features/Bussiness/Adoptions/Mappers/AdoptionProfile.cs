using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Bussiness.Adoptions.Dtos.Private;
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

            CreateMap<Adoption, AdoptionResponse>();

            CreateMap<User, Adop_UserResponse>();
            CreateMap<Pet, Adop_PetResponse>();
            CreateMap<RequestAdoption, Adop_RequestAdoptionResponse>()
                .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User))
                .ForMember(dest => dest.Pet, opt => opt.MapFrom(src => src.Pet));

        }
    }
}