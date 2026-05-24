using API.Domain.Model.Bussiness;
using API.Domain.Repository.Bussiness;
using API.Domain.Repository.System;
using API.Infrastructure.Common.RepositoryImpl;
using API.Infrastructure.Db;

namespace API.Infrastructure.RepositoryImpl.Bussiness;

public class DonationRepositoryImpl: BaseRepositoryImpl<Donation>, IDonationRepository
{
    public DonationRepositoryImpl(
        ConnDbContext context,
        IAuditLogRepository auditLogRepository
    ) : base(context, auditLogRepository)
    {
    }
}