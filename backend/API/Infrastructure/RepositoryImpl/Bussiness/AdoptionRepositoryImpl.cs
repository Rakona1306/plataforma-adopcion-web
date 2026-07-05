using System.Linq.Expressions;
using API.Domain.Common.Repository;
using API.Domain.Model.Bussiness;
using API.Domain.Repository.System;
using API.Infrastructure.Common.RepositoryImpl;
using API.Infrastructure.Db;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.RepositoryImpl.Bussiness
{
    public interface IAdoptionRepository
    {
        IQueryable<AdoptionDetails> Query();

        Task<AdoptionDetails?> GetByIdAsync(Guid id);

        Task<AdoptionDetails?> GetByRequestIdAsync(Guid requestId);

        Task<bool> ExistsByRequestIdAsync(Guid requestId);

        Task<AdoptionDetails?> FirstOrDefaultAsync(
            Expression<Func<AdoptionDetails, bool>> predicate
        );

        Task<bool> ExistsAsync(
            Expression<Func<AdoptionDetails, bool>> predicate
        );

        Task<AdoptionDetails> CreateAsync(AdoptionDetails entity);

        Task<AdoptionDetails> UpdateAsync(
            AdoptionDetails entity,
            Guid? userId,
            object? oldValues = null
        );

        Task DeleteAsync(
            AdoptionDetails entity,
            Guid? userId
        );

        Task<List<AdoptionDetails>> GetAllAsync();

        Task<List<AdoptionDetails>> FindAsync(
            Expression<Func<AdoptionDetails, bool>> predicate
        );

        Task<int> CountAsync(
            Expression<Func<AdoptionDetails, bool>>? predicate = null
        );

        Task<bool> AnyAsync(
            Expression<Func<AdoptionDetails, bool>> predicate
        );

        IQueryable<AdoptionDetails> Paginate(
            IQueryable<AdoptionDetails> query,
            int page,
            int pageSize
        );

        Task<int> SaveChangesAsync();
    }

    public class AdoptionRepositoryImpl : IAdoptionRepository
    {
        protected readonly ConnDbContext Context;

        protected readonly DbSet<AdoptionDetails> DbSet;

        public AdoptionRepositoryImpl(
            ConnDbContext context
        )
        {
            Context = context;
            DbSet = context.Set<AdoptionDetails>();
        }

        public IQueryable<AdoptionDetails> Query()
        {
            return DbSet
                .AsQueryable()
                .AsNoTracking();
        }

        public async Task<AdoptionDetails?> GetByIdAsync(Guid id)
        {
            return await DbSet.FindAsync(id);
        }

        public async Task<AdoptionDetails?> GetByRequestIdAsync(Guid requestId)
        {
            return await DbSet
                .Include(x => x.Request)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.RequestId == requestId);
        }

        public async Task<bool> ExistsByRequestIdAsync(Guid requestId)
        {
            return await DbSet
                .AnyAsync(x => x.RequestId == requestId);
        }

        public async Task<AdoptionDetails?> FirstOrDefaultAsync(
            Expression<Func<AdoptionDetails, bool>> predicate
        )
        {
            return await DbSet
                .FirstOrDefaultAsync(predicate);
        }

        public async Task<bool> ExistsAsync(
            Expression<Func<AdoptionDetails, bool>> predicate
        )
        {
            return await DbSet
                .AnyAsync(predicate);
        }

        public async Task<AdoptionDetails> CreateAsync(AdoptionDetails entity)
        {
            await DbSet.AddAsync(entity);

            return entity;
        }

        public async Task<AdoptionDetails> UpdateAsync(
            AdoptionDetails entity,
            Guid? userId,
            object? oldValues = null
        )
        {
            DbSet.Update(entity);

            return entity;
        }

        public async Task DeleteAsync(
            AdoptionDetails entity,
            Guid? userId
        )
        {
            DbSet.Remove(entity);
        }

        public async Task<List<AdoptionDetails>> GetAllAsync()
        {
            return await DbSet
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<List<AdoptionDetails>> FindAsync(
            Expression<Func<AdoptionDetails, bool>> predicate
        )
        {
            return await DbSet
                .Where(predicate)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<int> CountAsync(
            Expression<Func<AdoptionDetails, bool>>? predicate = null
        )
        {
            if (predicate == null)
            {
                return await DbSet.CountAsync();
            }

            return await DbSet.CountAsync(predicate);
        }

        public async Task<bool> AnyAsync(
            Expression<Func<AdoptionDetails, bool>> predicate
        )
        {
            return await DbSet.AnyAsync(predicate);
        }

        public IQueryable<AdoptionDetails> Paginate(
            IQueryable<AdoptionDetails> query,
            int page,
            int pageSize
        )
        {
            return query
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await Context.SaveChangesAsync();
        }
    }
}