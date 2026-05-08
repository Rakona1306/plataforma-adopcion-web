using System.ComponentModel.DataAnnotations;

namespace API.Domain.Model.System
{
    public class AuditLog
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        [Required]
        public string TableName { get; set; } = string.Empty;
        [Required]
        public string RecordId { get; set; } = string.Empty;
        public object? OldValues { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
