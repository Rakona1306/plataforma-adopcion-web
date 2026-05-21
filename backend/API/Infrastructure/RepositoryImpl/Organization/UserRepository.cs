using API.Domain.Common.Model;
using API.Domain.Model;
using API.Domain.Repository.Organization;
using API.Domain.Repository.System;
using API.Infrastructure.Common.RepositoryImpl;
using API.Infrastructure.Db;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.RepositoryImpl.Organization
{
    public class UserRepository : BaseRepositoryImpl<User>, IUserRepository
    {
        public UserRepository(
            ConnDbContext context,
            IAuditLogRepository auditLogRepository
        ) : base(context, auditLogRepository)
        {
        }

        public async Task<User?> GetByEmailAsync(
            string email
        )
        {
            return await Context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x =>
                    x.Email == email
                );
        }
    }
}
