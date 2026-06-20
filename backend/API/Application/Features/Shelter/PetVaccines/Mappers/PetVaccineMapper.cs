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

#pragma warning disable RMG020 // Source member is not mapped to any target member
        [MapProperty(nameof(PetVaccine.ExpirationDate), nameof(PetVaccineResponse.IsExpired), Use = nameof(CalculateIsExpired))]
        public partial PetVaccineResponse ToResponse(
            PetVaccine entity
        );
#pragma warning restore RMG020 // Source member is not mapped to any target member
#pragma warning disable RMG012 // Source member was not found for target member
        [MapProperty(nameof(PetVaccine.ExpirationDate), nameof(PetVaccineNoRelationsResponse.IsExpired), Use = nameof(CalculateIsExpired))]
        public partial PetVaccineNoRelationsResponse ToResponseWithoutRelations(PetVaccine entity);
#pragma warning restore RMG012 // Source member was not found for target member

        public partial List<PetVaccineResponse> ToResponseList(List<PetVaccine> entities);

        [MapperIgnoreTarget(nameof(PetVaccine.Pet))]
        [MapperIgnoreTarget(nameof(PetVaccine.Vaccine))]
        public partial void Update(UpdatePetVaccineDto dto, [MappingTarget] PetVaccine entity);

        private bool CalculateIsExpired(DateTime? expirationDate)
        {
            if (!expirationDate.HasValue)
            {
                return false;
            }

            return expirationDate.Value < DateTime.UtcNow;
        }
    }
}
