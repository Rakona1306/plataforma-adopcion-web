using API.Domain.Common.Model;
using API.Domain.Model;
using API.Domain.Repository.Organization;
using API.Infrastructure.Db;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.RepositoryImpl.Organization
{
    public class UserRepository : IUserRepository
    {
        private readonly ConnDbContext _context;
        public UserRepository(ConnDbContext context)
        {
            _context = context;
        }
        public async Task<User?> GetByEmailAsync(string email)
        {
            email = email.Trim().ToLower();
            var query = _context.Users;
            return await query.FirstOrDefaultAsync(x => x.Email.ToLower() == email);
        }

        public async Task<User> CreateAsync(User entity)
        {
            var query = _context.Users;
            entity.CreatedAt = DateTime.UtcNow;
            await query.AddAsync(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public Task DeleteAsync(User entity, Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<Paginate<User>> GetAllAsync(int page, int pageSize, string? search = null, string? sort = null)
        {
            throw new NotImplementedException();
        }

        public Task<User?> GetByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<User> UpdateAsync(User entity, Guid id)
        {
            _context.Users.Update(entity);

            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
