using API.Domain.Common.Repository;
using API.Domain.Model.Bussiness;
using API.Domain.Repository.System;
using API.Infrastructure.Db;

namespace API.Domain.Repository.Bussiness
{
    public interface IGivingRepository : IBaseIntRepository<Giving>
    {

    }

    public class GivingRepository : BaseIntRepository<Giving>, IGivingRepository
    {
        public GivingRepository(
            ConnDbContext context,
            IAuditLogRepository auditLogRepository
        ) : base(context, auditLogRepository)
        {
        }
    }
}