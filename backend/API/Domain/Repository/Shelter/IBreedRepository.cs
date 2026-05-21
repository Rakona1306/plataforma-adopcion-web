using API.Domain.Common.Repository;
using API.Domain.Model.Shelter;

namespace API.Domain.Repository.Shelter
{
    public interface IBreedRepository: IBaseRepository<Breed>
    {
        Task<List<Breed>> GetBySpeciesAsync(
            Guid speciesId
        );
    }
}
