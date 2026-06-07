using API.Domain.Model.Organization;
using API.Domain.Repository.Organization;
using API.Domain.Repository.System;
using API.Infrastructure.Common.RepositoryImpl;
using API.Infrastructure.Db;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.RepositoryImpl.Organization
{
    public class PermissionRepository : BaseRepositoryImpl<Permission>, IPermissionRepository
    {
        public PermissionRepository(
            ConnDbContext context,
            IAuditLogRepository auditLogRepository
        ) : base(context, auditLogRepository)
        {
        }

        public IQueryable<Role> QueryWithPermissions()
        {
            return Context.Roles
                .Include(r => r.RolePermissions)
                    .ThenInclude(rp => rp.Permission)
                .AsNoTracking();
        }
    }
}
