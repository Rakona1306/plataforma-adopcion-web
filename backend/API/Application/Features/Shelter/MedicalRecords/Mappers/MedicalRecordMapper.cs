using API.Application.Features.Shelter.MedicalRecords.Dtos;
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
        public partial MedicalRecordResponse ToResponse(
            MedicalRecord entity
        );

        public partial List<MedicalRecordResponse>
            ToResponseList(
                List<MedicalRecord> entities
            );
    }
}
