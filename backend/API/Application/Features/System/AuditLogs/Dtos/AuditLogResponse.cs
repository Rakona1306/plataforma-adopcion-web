using API.Domain.Model.Enums;

namespace API.Application.Features.System.AuditLogs.Dtos
{
    public class AuditLogResponse
    {
        public int Id { get; set; }
        public Guid? UserId { get; set; }
        public AuditEnum AuditType { get; set; }
        public string TableName { get; set; } = string.Empty;
        public Guid RecordId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
