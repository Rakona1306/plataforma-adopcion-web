using API.Application.Features.Bussiness.Givings.Dtos.Private;
using API.Application.Features.Bussiness.Givings.Dtos.Public;
using API.Domain.Model.Bussiness;
using AutoMapper;

namespace API.Application.Features.Bussiness.Givings.Mappers
{
    public class GivingMappingProfile : Profile
    {
        public GivingMappingProfile()
        {
            // 1. Entidad -> Response (Mapeo automático de Enums a String)
            CreateMap<Giving, GivingResponse>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.ToString()))
                .ForMember(dest => dest.Unit, opt => opt.MapFrom(src => src.Unit.HasValue ? src.Unit.Value.ToString() : null));

            // 2. Create Dto -> Entidad
            CreateMap<CreateGivingDto, Giving>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.LastUpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedBy, opt => opt.Ignore());

            // 3. Update Dto -> Entidad (Ignoramos auditoría para que la maneje el Service/Helper)
            CreateMap<UpdateGivingDto, Giving>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.LastUpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedBy, opt => opt.Ignore());

            CreateMap<Giving, GivingPubResponse>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.ToString()))
                .ForMember(dest => dest.Unit, opt => opt.MapFrom(src => src.Unit.HasValue ? src.Unit.Value.ToString() : null));
        }
    }
}