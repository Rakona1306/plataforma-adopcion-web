using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using API.Domain.Common.Model;
using API.Infrastructure.Db;
using Microsoft.EntityFrameworkCore;

namespace API.Domain.Common.Repository
{
    public class BaseRepositoryWithoutAudit<T>
    : IBaseRepositoryWithoutAudit<T>
    where T : BaseModelInt
    {
        protected readonly ConnDbContext Context;

        protected readonly DbSet<T> DbSet;

        public BaseRepositoryWithoutAudit(
            ConnDbContext context
        )
        {
            Context = context;
            DbSet = context.Set<T>();
        }

        public IQueryable<T> Query()
        {
            return DbSet
                .AsQueryable()
                .AsNoTracking();
        }

        public async Task<T?> GetByIdAsync(Guid id)
        {
            return await DbSet.FindAsync(id);
        }

        public async Task<T?> FirstOrDefaultAsync(
            Expression<Func<T, bool>> predicate
        )
        {
            return await DbSet
                .FirstOrDefaultAsync(predicate);
        }

        public async Task<bool> ExistsAsync(
            Expression<Func<T, bool>> predicate
        )
        {
            return await DbSet
                .AnyAsync(predicate);
        }

        public async Task<T> CreateAsync(
            T entity,
            Guid? userId
        )
        {
            entity.CreatedAt = DateTime.UtcNow;
            entity.LastUpdatedAt = DateTime.UtcNow;
            entity.CreatedBy = userId;
            entity.UpdatedBy = userId;

            await DbSet.AddAsync(entity);

            return entity;
        }

        public async Task<T> UpdateAsync(
            T entity,
            Guid? userId
        )
        {

            entity.LastUpdatedAt = DateTime.UtcNow;
            entity.UpdatedBy = userId;

            DbSet.Update(entity);

            return entity;
        }

        public async Task DeleteAsync(
            T entity,
            Guid? userId
        )
        {
            DbSet.Remove(entity);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await Context.SaveChangesAsync();
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await DbSet
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<List<T>> FindAsync(
            Expression<Func<T, bool>> predicate
        )
        {
            return await DbSet
                .Where(predicate)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<int> CountAsync(
            Expression<Func<T, bool>>? predicate = null
        )
        {
            if (predicate == null)
            {
                return await DbSet.CountAsync();
            }

            return await DbSet.CountAsync(predicate);
        }

        public async Task<bool> AnyAsync(
            Expression<Func<T, bool>> predicate
        )
        {
            return await DbSet.AnyAsync(predicate);
        }

        public IQueryable<T> Paginate(
            IQueryable<T> query,
            int page,
            int pageSize
        )
        {
            return query
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }
    }
}