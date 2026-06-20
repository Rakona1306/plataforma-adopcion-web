using API.Application.Features.Shelter.MedicalRecords.Dtos;
using API.Application.Features.Shelter.Pets.Dtos;
using API.Domain.Model.Shelter;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Shelter.MedicalRecords.Mappers
{
    [Mapper]
    public partial class MedicalRecordMapper
    {
        public partial MedicalRecord ToEntity(
            CreateMedicalRecordDto dto
        );

        public partial void Update(
            UpdateMedicalRecordDto dto,
            [MappingTarget] MedicalRecord entity
        );

        [MapProperty(
            nameof(MedicalRecord.Pet.Name),
            nameof(MedicalRecordResponse.PetName)
        )]
        public MedicalRecordResponse ToResponse(
            MedicalRecord entity
        )
        {
            var response = ToResponseInternal(entity);

            response.Pet = new PetRelationResponse
            {
                Id = entity.Pet.Id,
                Name = entity.Pet.Name
            };

            return response;
        }

        [MapperIgnoreTarget(nameof(MedicalRecordResponse.Pet))]
        private partial MedicalRecordResponse ToResponseInternal(MedicalRecord entity);

        public partial List<MedicalRecordResponse>
            ToResponseList(
                List<MedicalRecord> entities
            );
    }
}
