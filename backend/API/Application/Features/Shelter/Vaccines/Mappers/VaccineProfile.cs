using API.Application.Features.Shelter.Vaccines.Dtos;
using API.Domain.Model.Shelter;

using AutoMapper;

namespace API.Application.Features.Shelter.Vaccines.Mappers
{
    public class VaccineProfile : Profile
    {
        public VaccineProfile()
        {
            CreateMap<Vaccine, VaccineRelationResponse>();
        }
    }
}
