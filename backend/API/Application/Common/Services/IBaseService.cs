using API.Application.Features.System.AuditLogs.Dtos;
using API.Domain.Common.Model;

namespace API.Application.Common.Services
{
    public interface IBaseService<
    TResponse,
    TCreate,
    TUpdate,
    TFilter>
    {
        Task<Paginate<TResponse>> GetAllAsync(
            TFilter filter
        );

        Task<TResponse?> GetByIdAsync(Guid id);

        Task<TResponse> CreateAsync(
            TCreate dto,
            Guid? userId = null
        );

        Task<TResponse> UpdateAsync(
            Guid id,
            TUpdate dto,
            Guid? userId = null
        );

        Task DeleteAsync(
            Guid id,
            Guid? userId = null
        );

        Task<Paginate<AuditLogResponse>> GetInteractionsAsync(
            int page,
            int pageSize,
            Guid recordId
        );

    }
}
