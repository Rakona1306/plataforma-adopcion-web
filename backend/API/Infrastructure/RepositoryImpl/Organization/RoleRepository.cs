using API.Domain.Common.Model;
using API.Domain.Model.Organization;
using API.Domain.Repository.Organization;
using API.Infrastructure.Db;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.RepositoryImpl.Organization
{
    public class RoleRepository : IRoleRepository
    {
        private readonly ConnDbContext _context; 
        public RoleRepository(ConnDbContext context)
        {
            _context = context;
        }

        public async Task<Role> CreateAsync(Role entity)
        {
            var query = _context.Roles;
            await query.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(Role entity, Guid id)
        {
            entity.Id = id;
            var query = _context.Roles;
            query.Remove(entity);
            await _context.SaveChangesAsync();

        }

        public async Task<Paginate<Role>> GetAllAsync(int page, int pageSize, string? search = null, string? sort = null)
        {
            page = page <= 0 ? 1 : page;
            pageSize = pageSize <= 0 ? 10 : pageSize;

            IQueryable<Role> query = _context.Roles
                .AsNoTracking();

            // 🔎 Search
            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(x =>
                    x.Name.Contains(search));
            }

            sort = sort?.ToLower();

            query = sort switch
            {
                "asc" => query.OrderBy(x => x.CreatedAt),
                "desc" => query.OrderByDescending(x => x.CreatedAt),
                _ => query.OrderByDescending(x => x.CreatedAt) // default recomendado
            };

            // 📊 Total
            var totalCount = await query.CountAsync();

            // 📄 Paginación
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new Paginate<Role>
            {
                Items = items,
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize
            };
        }

        public async Task<Role?> GetByIdAsync(Guid id)
        {
            var query = _context.Roles;
            return await query.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Role> UpdateAsync(Role entity, Guid id)
        {
            _context.Roles.Update(entity);

            await _context.SaveChangesAsync();

            return entity;
        }
    }
}
