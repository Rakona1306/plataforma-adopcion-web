namespace API.Application.Features.System.AuditLogs.Dtos
{
    public class AuditLogResponse
    {
        public int Id { get; set; }
        public Guid? UserId { get; set; }
        public string AuditType { get; set; } = string.Empty;
        public string TableName { get; set; } = string.Empty;
        public Guid RecordId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
