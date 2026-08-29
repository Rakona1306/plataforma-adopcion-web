using API.Application.Features.Bussiness.PricingSponsors.Dtos;
using API.Domain.Model.Bussiness;
using AutoMapper;

namespace API.Application.Features.Bussiness.PricingSponsors.Mappers
{
    public class PricingSponsorProfile : Profile
    {
        public PricingSponsorProfile()
        {
            CreateMap<CreatePricingSponsor, PricingSponsor>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.LastUpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedBy, opt => opt.Ignore());
            CreateMap<PricingSponsor, PricingSponsorResponse>();
            CreateMap<UpdatePricingSponsor, PricingSponsor>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.LastUpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedBy, opt => opt.Ignore());
        }
    }
}