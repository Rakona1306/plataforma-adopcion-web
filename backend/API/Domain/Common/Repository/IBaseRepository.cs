using API.Domain.Common.Model;
using API.Domain.Model.System;
using System.Linq.Expressions;

namespace API.Domain.Common.Repository
{
    public interface IBaseRepository<T>
        where T : BaseModel
    {
        IQueryable<T> Query();

        Task<T?> GetByIdAsync(Guid id);

        Task<T?> FirstOrDefaultAsync(
            Expression<Func<T, bool>> predicate
        );

        Task<bool> ExistsAsync(
            Expression<Func<T, bool>> predicate
        );

        Task<bool> AnyAsync(
            Expression<Func<T, bool>> predicate
        );

        Task<List<T>> GetAllAsync();

        Task<List<T>> FindAsync(
            Expression<Func<T, bool>> predicate
        );

        Task<int> CountAsync(
            Expression<Func<T, bool>>? predicate = null
        );

        IQueryable<T> Paginate(
            IQueryable<T> query,
            int page,
            int pageSize
        );

        Task<T> CreateAsync(
            T entity,
            Guid? userId
        );

        Task<T> UpdateAsync(
            T entity,
            Guid? userId
        );

        Task<T> UpdateAsync(
            T entity,
            Guid? userId,
            object? oldValues
        );

        Task DeleteAsync(
            T entity,
            Guid? userId
        );

        Task<int> SaveChangesAsync();

        Task<Paginate<AuditLog>>
        GetInteractionsAsync(
            int page,
            int pageSize,
            Guid recordId
        );
    }
}
