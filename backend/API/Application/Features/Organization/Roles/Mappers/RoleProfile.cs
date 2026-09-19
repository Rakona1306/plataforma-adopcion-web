using API.Application.Features.Bussiness.Permissions.Dtos;
using API.Application.Features.Organization.Roles.Dtos;
using API.Domain.Model.Organization;
using AutoMapper;

namespace API.Application.Features.Organization.Roles.Mappers
{
    public class RoleProfile : Profile
    {
        public RoleProfile()
        {
            // Entity -> Response
            CreateMap<Role, RoleResponse>()
                .ForMember(dest => dest.UsersCount,
                           opt => opt.MapFrom(src => src.Users.Count))
                .ForMember(dest => dest.Permissions,
                           opt => opt.MapFrom(src => src.RolePermissions.Select(rp => rp.Permission)));

            CreateMap<Permission, PermissionResponse>();

            // Create DTO -> Entity
            CreateMap<CreateRoleDto, Role>()
                .ForMember(dest => dest.RolePermissions, opt => opt.Ignore()); // se arma a mano en el service

            // Update DTO -> Entity (solo pisa campos simples)
            CreateMap<UpdateRoleDto, Role>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.RolePermissions, opt => opt.Ignore())
                .ForMember(dest => dest.Users, opt => opt.Ignore());
        }
    }
}
