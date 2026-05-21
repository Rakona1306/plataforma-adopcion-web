using API.Application.Features.Shelter.PetBreeds.Dtos;
using API.Application.Features.System.AuditLogs.Dtos;
using API.Domain.Common.Model;

namespace API.Application.Services.Shelter.PetBreedes
{
    public interface IPetBreedService
    {
        Task<Paginate<PetBreedResponse>>
            GetAllAsync(
                PetBreedFilterDto filter
            );

        Task<PetBreedResponse?>
            GetByIdAsync(
                Guid petId,
                Guid breedId
            );

        Task<PetBreedResponse>
            CreateAsync(
                CreatePetBreedDto dto,
                Guid? userId = null
            );

        Task<PetBreedResponse>
            UpdateAsync(
                Guid petId,
                Guid breedId,
                UpdatePetBreedDto dto,
                Guid? userId = null
            );

        Task DeleteAsync(
            Guid petId,
            Guid breedId,
            Guid? userId = null
        );

        Task<Paginate<AuditLogResponse>>
            GetInteractionsAsync(
                int page,
                int pageSize,
                Guid recordId
            );
    }
}
