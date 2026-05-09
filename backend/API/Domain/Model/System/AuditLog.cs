using API.Domain.Model.Enums;
using System.ComponentModel.DataAnnotations;

namespace API.Domain.Model.System
{
    public class AuditLog
    {
        [Key]
        public int Id { get; set; }
        public Guid? UserId { get; set; }
        public AuditEnum AuditType { get; set; }
        [Required]
        public string TableName { get; set; } = string.Empty;
        [Required]
        public Guid RecordId { get; set; }
        public string? OldValues { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
