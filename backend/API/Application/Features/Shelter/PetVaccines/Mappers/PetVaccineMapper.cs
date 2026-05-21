using API.Application.Features.Shelter.PetVaccines.Dtos;
using API.Domain.Model.Shelter;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Shelter.PetVaccines.Mappers
{
    [Mapper]
    public partial class PetVaccineMapper
    {
        public partial PetVaccine ToEntity(
            CreatePetVaccineDto dto
        );

        [MapProperty(
            nameof(PetVaccine.Vaccine.Name),
            nameof(PetVaccineResponse.VaccineName)
        )]
        public partial PetVaccineResponse ToResponse(
            PetVaccine entity
        );

        public partial List<PetVaccineResponse>
            ToResponseList(
                List<PetVaccine> entities
            );

        private bool MapIsExpired(
            PetVaccine entity
        )
        {
            if (!entity.ExpirationDate.HasValue)
            {
                return false;
            }

            return entity.ExpirationDate.Value
                < DateTime.UtcNow;
        }
    }
}
