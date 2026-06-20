using API.Domain.Model.Shelter;
using API.Domain.Repository.Shelter;
using API.Domain.Repository.System;
using API.Infrastructure.Common.RepositoryImpl;
using API.Infrastructure.Db;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.RepositoryImpl.Shelter
{
    public class PetRepository
    : BaseRepositoryImpl<Pet>,
      IPetRepository
    {
        public PetRepository(ConnDbContext context, IAuditLogRepository auditLogRepository)
            : base(context, auditLogRepository)
        {
        }

        public async Task<Pet?> GetCompleteAsync(Guid id)
        {
            return await Context.Pets
                .Include(x => x.Species)
                .Include(x => x.Photos)
                .Include(x => x.PetBreeds)
                    .ThenInclude(x => x.Breed)
                .Include(x => x.PetTraits)
                    .ThenInclude(x => x.Trait)
                .Include(x => x.PetVaccines)
                    .ThenInclude(x => x.Vaccine)
                .FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
