using API.Domain.Common.Model;

namespace API.Application.Common.Services
{
    public interface IBaseService<TDto, TCreateDto, TUpdateDto>
    {
        Task<Paginate<TDto>> GetAllAsync(
            int page,
            int pageSize,
            string? search = null,
            string? sort = null
            );
        Task<TDto?> GetByIdAsync(Guid id);
        Task<TDto> CreateAsync(TCreateDto entity);
        Task<TDto> UpdateAsync(TUpdateDto entity, Guid id, int? userId, string tableName);
        Task DeleteAsync(Guid id, int? userId, string tableName);
    }
}
