using API.Application.Common.Services;
using API.Application.Features.Shelter.MedicalRecords.Dtos;

namespace API.Application.Services.Shelter.MedicalRecords
{
    public interface IMedicalRecordService
    : IBaseService<
        MedicalRecordResponse,
        CreateMedicalRecordDto,
        UpdateMedicalRecordDto,
        MedicalRecordFilterDto>
    {
    }
}
