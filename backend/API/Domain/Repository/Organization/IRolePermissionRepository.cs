using API.Domain.Model.Organization;

namespace API.Domain.Repository.Organization
{
    public interface IRolePermissionRepository
    {
        // Limpia todos los permisos de un rol específico
        Task DeleteByRoleIdAsync(Guid roleId);
        // Crea múltiples relaciones
        Task AddRangeAsync(IEnumerable<RolePermission> rolePermissions);
        Task DeleteRangeByPermissionIdsAsync(Guid roleId, List<Guid> permissionIds);
        Task<List<RolePermission>> GetPermissionsByRoleId(Guid roleId);
    }
}
