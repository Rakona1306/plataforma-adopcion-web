using API.Application.Features.Shelter.Vaccines.Dtos;
using API.Domain.Model.Shelter;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Shelter.Vaccines.Mappers
{
    [Mapper]
    public partial class VaccineMapper
    {
        public partial Vaccine ToEntity(
            CreateVaccineDto dto
        );

        public partial void Update(
            UpdateVaccineDto dto,
            [MappingTarget] Vaccine entity
        );

        public partial VaccineResponse ToResponse(
            Vaccine entity
        );

        public partial List<VaccineResponse>
            ToResponseList(
                List<Vaccine> entities
            );
    }
}
