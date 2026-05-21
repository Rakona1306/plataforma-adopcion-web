using API.Domain.Common.Repository;
using API.Domain.Model.Shelter;

namespace API.Domain.Repository.Shelter
{
    public interface IPetRepository: IBaseRepository<Pet>
    {
        Task<Pet?> GetCompleteAsync(Guid id);
    }
}
