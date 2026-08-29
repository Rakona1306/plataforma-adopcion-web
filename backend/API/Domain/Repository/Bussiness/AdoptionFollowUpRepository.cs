using API.Domain.Common.Repository;
using API.Domain.Model.Bussiness;
using API.Infrastructure.Db;

namespace API.Domain.Repository.Bussiness
{
    public interface IAdoptionFollowUpRepository : IBaseRepositoryWithoutAudit<AdoptionFollowUp>
    {

    }
    public class AdoptionFollowUpRepository : BaseRepositoryWithoutAudit<AdoptionFollowUp>, IAdoptionFollowUpRepository
    {
        public AdoptionFollowUpRepository(
            ConnDbContext context
        ) : base(context)
        {
        }
    }
}