using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Bussiness.AdoptionFollowUps.Dtos.Private;
using API.Domain.Model.Bussiness;
using AutoMapper;

namespace API.Application.Features.Bussiness.AdoptionFollowUps.Mappers
{
    public class AdoptionFollowUpProfile : Profile
    {
        public AdoptionFollowUpProfile()
        {
            CreateMap<AdoptionFollowUp, AdoptionFollowUpRelationResponse>();

            CreateMap<CreateAdoptionFollowUp, AdoptionFollowUp>();
            CreateMap<UpdateAdoptionFollowUp, AdoptionFollowUp>();

            CreateMap<AdoptionFollowUp, AdoptionFollowUpResponse>();
        }
    }
}