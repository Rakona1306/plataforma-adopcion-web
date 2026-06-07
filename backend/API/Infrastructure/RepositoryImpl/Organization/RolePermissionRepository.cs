using API.Domain.Model.Organization;
using API.Domain.Repository.Organization;
using API.Infrastructure.Db;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.RepositoryImpl.Organization
{
    public class RolePermissionRepository : IRolePermissionRepository
    {
        private readonly ConnDbContext _context;

        public RolePermissionRepository(
            ConnDbContext context
        )
        {
            _context = context;
        }

        public async Task AddRangeAsync(
            IEnumerable<RolePermission> rolePermissions
        )
        {
            await _context
                .Set<RolePermission>()
                .AddRangeAsync(rolePermissions);
        }

        public async Task DeleteByRoleIdAsync(
            Guid roleId
        )
        {
            var relations =
                await _context
                    .Set<RolePermission>()
                    .Where(
                        x => x.RoleId == roleId
                    )
                    .ToListAsync();

            _context
                .Set<RolePermission>()
                .RemoveRange(relations);
        }

        public async Task DeleteRangeByPermissionIdsAsync(
            Guid roleId,
            List<Guid> permissionIds
        )
        {
            var relations =
                await _context
                    .Set<RolePermission>()
                    .Where(
                        x =>
                            x.RoleId == roleId
                            && permissionIds.Contains(
                                x.PermissionId
                            )
                    )
                    .ToListAsync();

            _context
                .Set<RolePermission>()
                .RemoveRange(relations);
        }
    }
}
