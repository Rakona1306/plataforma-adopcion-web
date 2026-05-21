using API.Domain.Model.Organization;
using API.Domain.Repository.Organization;
using API.Domain.Repository.System;
using API.Infrastructure.Common.RepositoryImpl;
using API.Infrastructure.Db;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.RepositoryImpl.Organization
{
    public class RoleRepository : BaseRepositoryImpl<Role>, IRoleRepository
    {
        public RoleRepository(
            ConnDbContext context,
            IAuditLogRepository auditLogRepository
        ) : base(context, auditLogRepository)
        {
        }

        // =====================================
        // SEARCH BY NAME
        // =====================================

        public async Task<Role>
            SearchRoleByName(
                string name
            )
        {
            return await Context.Roles
                .AsNoTracking()
                .FirstAsync(x =>
                    x.Name.ToLower() ==
                    name.ToLower()
                );
        }
    }
}
