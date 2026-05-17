using API.Domain.Common.Repository;
using API.Domain.Model;

namespace API.Domain.Repository.Organization
{
    public interface IUserRepository : IBaseRepository<User>
    {
        public Task<User?> GetByEmailAsync(string email);
    }
}
