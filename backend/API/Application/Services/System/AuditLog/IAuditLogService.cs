using API.Application.Features.System.AuditLogs.Dtos;

namespace API.Application.Services.System.AuditLog
{
    public interface IAuditLogService
    {
        public Task<AuditLogResponse> getInteractions(int page, int pageSize, Guid recordId, string tableName);
    }
}
