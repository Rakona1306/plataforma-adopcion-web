using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Bussiness.RequestAdoptions.Dtos.Private;
using API.Application.Features.Bussiness.RequestAdoptions.Dtos.Private.Relations;
using API.Application.Features.Bussiness.RequestAdoptions.Dtos.Public;
using API.Domain.Model.Bussiness;
using API.Domain.Model.Organization;
using API.Domain.Model.Shelter;
using AutoMapper;

namespace API.Application.Features.Bussiness.RequestAdoptions.Mappers
{
    public class RequestAdoptionProfile : Profile
    {
        public RequestAdoptionProfile()
        {
            // Create -> Entity
            CreateMap<CreateRequestAdoption, RequestAdoption>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore()) // Se setea desde el contexto
                .ForMember(dest => dest.Status, opt => opt.Ignore()) // Default: PENDIENTE
                .ForMember(dest => dest.ReviewedAt, opt => opt.Ignore())
                .ForMember(dest => dest.ReviewedBy, opt => opt.Ignore())
                .ForMember(dest => dest.ReviewComment, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.LastUpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.Reviewer, opt => opt.Ignore())
                .ForMember(dest => dest.Pet, opt => opt.Ignore());

            // Update -> Entity
            CreateMap<UpdateRequestAdoption, RequestAdoption>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.Status, opt => opt.Ignore())
                .ForMember(dest => dest.ReviewedAt, opt => opt.Ignore())
                .ForMember(dest => dest.ReviewedBy, opt => opt.Ignore())
                .ForMember(dest => dest.ReviewComment, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.LastUpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.Reviewer, opt => opt.Ignore())
                .ForMember(dest => dest.Pet, opt => opt.Ignore());

            CreateMap<CreatePubRequestAdoption, RequestAdoption>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore()) // Se setea desde el contexto
                .ForMember(dest => dest.Status, opt => opt.Ignore()) // Default: PENDIENTE
                .ForMember(dest => dest.ReviewedAt, opt => opt.Ignore())
                .ForMember(dest => dest.ReviewedBy, opt => opt.Ignore())
                .ForMember(dest => dest.ReviewComment, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.LastUpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.Reviewer, opt => opt.Ignore())
                .ForMember(dest => dest.Pet, opt => opt.Ignore());

            // Entity -> Response completo
            CreateMap<RequestAdoption, RequestAdoptionResponse>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
                .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User))
                .ForMember(dest => dest.Pet, opt => opt.MapFrom(src => src.Pet))
                .ForMember(dest => dest.Reviewer, opt => opt.MapFrom(src => src.Reviewer));

            // Entity -> Response público
            CreateMap<RequestAdoption, RequestAdoptionPubResponse>();

            CreateMap<RequestAdoption, RequestAdoptionRelationResponse>();

            // Relaciones

            CreateMap<User, ReqAdop_UserResponse>();
            CreateMap<Pet, ReqAdop_PetResponse>();
            /*
            CreateMap<Pet, PetResponse>();
            CreateMap<Pet, PetPublicResponse>();
            */
        }
    }
}