using API.Domain.Model.Shelter;
using API.Domain.Repository.Shelter;
using API.Domain.Repository.System;
using API.Infrastructure.Common.RepositoryImpl;
using API.Infrastructure.Db;

namespace API.Infrastructure.RepositoryImpl.Shelter
{
    public class PetBreedRepositoryImpl : BaseRepositoryImpl<PetBreed>, IPetBreedRepository
    {
        public PetBreedRepositoryImpl(
            ConnDbContext context,
            IAuditLogRepository auditLogRepository
        ) : base(context, auditLogRepository)
        {
        }
    }
}
