using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using API.Domain.Common.Model;

namespace API.Domain.Common.Repository
{
    public interface IBaseRepositoryWithoutAudit<T> where T : BaseModelInt
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

        Task DeleteAsync(
            T entity,
            Guid? userId
        );

        Task<int> SaveChangesAsync();
    }
}