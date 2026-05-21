using API.Domain.Model.Shelter;
using API.Domain.Repository.Shelter;
using API.Domain.Repository.System;
using API.Infrastructure.Common.RepositoryImpl;
using API.Infrastructure.Db;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.RepositoryImpl.Shelter
{
    public class MedicalRecordRepositoryImpl : BaseRepositoryImpl<MedicalRecord>, IMedicalRecordRepository
    {
        public MedicalRecordRepositoryImpl(
            ConnDbContext context,
            IAuditLogRepository auditLogRepository
        ) : base(context, auditLogRepository)
        {
        }

        public async Task<List<MedicalRecord>> GetByPetAsync(
            Guid petId
        )
        {
            return await Context.MedicalRecords
                .Where(x => x.PetId == petId)
                .ToListAsync();
        }
    }
}
