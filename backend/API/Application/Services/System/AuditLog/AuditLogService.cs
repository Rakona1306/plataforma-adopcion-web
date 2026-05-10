using API.Application.Features.System.AuditLogs.Dtos;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Domain.Repository.System;

namespace API.Application.Services.System.AuditLog
{
    public class AuditLogService : IAuditLogService
    {
        private readonly IAuditLogRepository _repository;
        private readonly AuditLogMapper _mapper;
        
        public AuditLogService (IAuditLogRepository repository, AuditLogMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<AuditLogResponse> getInteractions(int page, int pageSize, Guid recordId, string tableName)
        {
            var auditlogs = _repository.GetInteractionsAsync(page, pageSize, recordId, tableName);

            return _mapper
        }
    }
}
