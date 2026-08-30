using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Organization.Users.Dtos;
using API.Domain.Model.Organization;
using AutoMapper;

namespace API.Application.Features.Organization.Users.Mappers
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserResponse>();
        }
    }
}