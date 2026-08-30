using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Common.Repository;
using API.Domain.Model.Bussiness;
using API.Infrastructure.Db;

namespace API.Domain.Repository.Bussiness
{
    public interface IPricingSponsorRepository : IBaseRepositoryWithoutAudit<PricingSponsor>
    {

    }
    public class PricingSponsorRepository : BaseRepositoryWithoutAudit<PricingSponsor>, IPricingSponsorRepository
    {
        public PricingSponsorRepository(
            ConnDbContext context
        ) : base(context)
        {
        }
    }
}