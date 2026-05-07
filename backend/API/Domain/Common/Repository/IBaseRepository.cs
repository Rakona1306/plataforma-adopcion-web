using API.Domain.Common.Model;

namespace API.Domain.Common.Repository
{
    public interface IBaseRepository<T>
    {
        Task<Paginate<T>> GetAllAsync(
            int page,
            int pageSize,
            string? search = null,
            string? sort = null
            );
        Task<T?> GetByIdAsync(int id);
        Task<T> CreateAsync(T entity);
        Task<T> UpdateAsync(T entity, int id, int userId, string tableName);
        Task DeleteAsync(int id, int? userId, string tableName);
    }
}
