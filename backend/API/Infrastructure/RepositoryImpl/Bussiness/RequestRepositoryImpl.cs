using API.Domain.Model.Bussiness;
using API.Domain.Repository.Bussiness;
using API.Domain.Repository.System;
using API.Infrastructure.Common.RepositoryImpl;
using API.Infrastructure.Db;

namespace API.Infrastructure.RepositoryImpl.Bussiness;

public class RequestRepositoryImpl: BaseRepositoryImpl<Request>, IRequestRepository
{
    public RequestRepositoryImpl(
        ConnDbContext context,
        IAuditLogRepository auditLogRepository
    ) : base(context, auditLogRepository)
    {
    }
}