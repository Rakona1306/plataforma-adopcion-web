using API.Domain.Common.Repository;
using API.Domain.Model.Bussiness;
using API.Infrastructure.Db;

namespace API.Domain.Repository.Bussiness
{
    public interface ISponsorRepository : IBaseRepositoryWithoutAudit<Sponsor>
    {

    }
    public class SponsorRepository : BaseRepositoryWithoutAudit<Sponsor>, ISponsorRepository
    {
        public SponsorRepository(
            ConnDbContext context
        ) : base(context)
        {
        }
    }
}