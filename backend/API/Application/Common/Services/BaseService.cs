using API.Application.Features.System.AuditLogs.Dtos;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Domain.Common.Model;
using API.Domain.Common.Repository;

namespace API.Application.Common.Services
{
    public class BaseService<
    TEntity,
    TRepository>
    where TEntity : BaseModel
    where TRepository
        : IBaseRepository<TEntity>
    {
        protected readonly TRepository
            Repository;

        private readonly AuditLogMapper
            _auditLogMapper;

        public BaseService(
            TRepository repository,
            AuditLogMapper auditLogMapper
        )
        {
            Repository = repository;

            _auditLogMapper =
                auditLogMapper;
        }

        public async Task<
            Paginate<AuditLogResponse>
        > GetInteractionsAsync(
            int page,
            int pageSize,
            Guid recordId
        )
        {
            var interactions =
                await Repository
                    .GetInteractionsAsync(
                        page,
                        pageSize,
                        recordId
                    );

            return new Paginate<AuditLogResponse>
            {
                Items =
                    _auditLogMapper.ToResponseList(
                        interactions.Items.ToList()
                    ),

                TotalCount =
                    interactions.TotalCount,

                Page =
                    interactions.Page,

                PageSize =
                    interactions.PageSize
            };
        }
    }
}
