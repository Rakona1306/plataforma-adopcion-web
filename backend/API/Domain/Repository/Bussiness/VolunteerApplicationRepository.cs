using API.Domain.Common.Repository;
using API.Domain.Model.Bussiness;
using API.Domain.Repository.System;
using API.Infrastructure.Db;

namespace API.Domain.Repository.Bussiness
{
    public interface IVolunteerApplicationRepository : IBaseIntRepository<VolunteerApplication>
    {

    }

    public class VolunteerApplicationRepository : BaseIntRepository<VolunteerApplication>, IVolunteerApplicationRepository
    {
        public VolunteerApplicationRepository(
            ConnDbContext context,
            IAuditLogRepository auditLogRepository
        ) : base(context, auditLogRepository)
        {
        }
    }
}
