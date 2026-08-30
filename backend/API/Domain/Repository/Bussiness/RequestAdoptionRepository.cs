using API.Domain.Common.Repository;
using API.Domain.Model.Bussiness;
using API.Domain.Repository.System;
using API.Infrastructure.Db;

namespace API.Domain.Repository.Bussiness
{
    public interface IRequestAdoptionRepository : IBaseIntRepository<RequestAdoption>
    {

    }
    public class RequestAdoptionRepository : BaseIntRepository<RequestAdoption>, IRequestAdoptionRepository
    {
        public RequestAdoptionRepository(
            ConnDbContext context,
            IAuditLogRepository auditLogRepository
        ) : base(context, auditLogRepository)
        {
        }
    }
}