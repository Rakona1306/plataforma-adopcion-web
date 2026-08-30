using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Common.Repository;
using API.Domain.Model.Bussiness;
using API.Infrastructure.Db;

namespace API.Domain.Repository.Bussiness
{
    public interface IAdoptionRepository : IBaseRepositoryWithoutAudit<Adoption>
    {

    }
    public class AdoptionRepository : BaseRepositoryWithoutAudit<Adoption>, IAdoptionRepository
    {

        public AdoptionRepository(
            ConnDbContext context
        ) : base(context)
        {
        }
    }
}