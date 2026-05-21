using API.Domain.Common.Model;
using API.Domain.Common.Repository;
using API.Domain.Model.Enums;
using API.Domain.Model.System;
using API.Domain.Repository.System;
using API.Infrastructure.Db;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace API.Infrastructure.Common.RepositoryImpl
{
    public class BaseRepositoryImpl<T>
    : IBaseRepository<T>
    where T : BaseModel
    {
        protected readonly ConnDbContext Context;

        protected readonly DbSet<T> DbSet;

        private readonly IAuditLogRepository _auditLogRepository;

        public BaseRepositoryImpl(
            ConnDbContext context,
            IAuditLogRepository auditLogRepository
        )
        {
            Context = context;
            DbSet = context.Set<T>();
            _auditLogRepository = auditLogRepository;
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

            await _auditLogRepository.CreateAsync(
                AuditEnum.CREATE,
                entity.Id,
                typeof(T).Name,
                userId,
                entity
            );

            return entity;
        }

        public async Task<T> UpdateAsync(
            T entity,
            Guid? userId
        )
        {
            var oldEntity = await DbSet
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == entity.Id);

            entity.LastUpdatedAt = DateTime.UtcNow;
            entity.UpdatedBy = userId;

            DbSet.Update(entity);

            await _auditLogRepository.CreateAsync(
                AuditEnum.UPDATE,
                entity.Id,
                typeof(T).Name,
                userId,
                oldEntity
            );

            return entity;
        }

        public async Task<T> UpdateAsync(
            T entity,
            Guid? userId,
            object? oldValues = null
        )
        {
            entity.LastUpdatedAt = DateTime.UtcNow;
            entity.UpdatedBy = userId;

            DbSet.Update(entity);

            await _auditLogRepository.CreateAsync(
                AuditEnum.UPDATE,
                entity.Id,
                typeof(T).Name,
                userId,
                oldValues
            );

            return entity;
        }

        public async Task DeleteAsync(
            T entity,
            Guid? userId
        )
        {
            DbSet.Remove(entity);

            await _auditLogRepository.CreateAsync(
                AuditEnum.DELETE,
                entity.Id,
                typeof(T).Name,
                userId,
                entity
            );
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

        public async Task<Paginate<AuditLog>> GetInteractionsAsync(
            int page,
            int pageSize,
            Guid recordId
        )
        {
            return await _auditLogRepository
                .GetInteractionsAsync(
                    page,
                    pageSize,
                    recordId,
                    typeof(T).Name
                );
        }
    }
}
