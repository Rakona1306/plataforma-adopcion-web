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
        public string RecordId { get; set; } = string.Empty;
        public string? OldValues { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
