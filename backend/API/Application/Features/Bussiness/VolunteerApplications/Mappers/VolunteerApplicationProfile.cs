using API.Application.Features.Bussiness.VolunteerApplications.Dtos.Private;
using API.Application.Features.Bussiness.VolunteerApplications.Dtos.Public;
using API.Domain.Model.Bussiness;
using AutoMapper;

namespace API.Application.Features.Bussiness.VolunteerApplications.Mappers
{
    public class VolunteerApplicationProfile : Profile
    {
        public VolunteerApplicationProfile()
        {
            // Mapeo para Crear (DTO -> Entity)
            CreateMap<CreateVolunteerApplication, VolunteerApplication>();

            // Mapeo para Actualizar (DTO -> Entity existente)
            CreateMap<UpdateVolunteerApplication, VolunteerApplication>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()); // Ignorar ID en update

            // Mapeo para Respuesta (Entity -> Response DTO) - Usado para ProjectTo
            CreateMap<VolunteerApplication, VolunteerApplicationResponse>();

            CreateMap<VolunteerApplication, VolunteerApplicationPublicResponse>();
        }
    }
}
