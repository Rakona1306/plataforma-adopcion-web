using API.Domain.Model.Shelter;
using API.Domain.Repository.Shelter;
using API.Domain.Repository.System;
using API.Infrastructure.Common.RepositoryImpl;
using API.Infrastructure.Db;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.RepositoryImpl.Shelter
{
    public class BreedRepositoryImpl : BaseRepositoryImpl<Breed>,
      IBreedRepository
    {
        public BreedRepositoryImpl(
            ConnDbContext context,
            IAuditLogRepository auditLogRepository
        ) : base(context, auditLogRepository)
        {
        }

        public async Task<List<Breed>> GetBySpeciesAsync(
            Guid speciesId
        )
        {
            return await Context.Breeds
                .Where(x => x.SpeciesId == speciesId)
                .ToListAsync();
        }
    }
}
