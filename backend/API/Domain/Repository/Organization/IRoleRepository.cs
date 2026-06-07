using API.Domain.Common.Repository;
using API.Domain.Model.Organization;

namespace API.Domain.Repository.Organization
{
    public interface IRoleRepository : IBaseRepository<Role>
    {
        IQueryable<Role> QueryWithPermissions();
        Task<Role> SearchRoleByName(string name);
    }
}
