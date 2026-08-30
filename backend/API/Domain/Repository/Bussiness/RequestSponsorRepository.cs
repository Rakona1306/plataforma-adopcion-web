using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Common.Repository;
using API.Domain.Model.Bussiness;
using API.Infrastructure.Db;

namespace API.Domain.Repository.Bussiness
{
    public interface IRequestSponsorRepository : IBaseRepositoryWithoutAudit<RequestSponsor>
    {

    }
    public class RequestSponsorRepository : BaseRepositoryWithoutAudit<RequestSponsor>, IRequestSponsorRepository
    {
        public RequestSponsorRepository(
            ConnDbContext context
        ) : base(context)
        {
        }

    }
}