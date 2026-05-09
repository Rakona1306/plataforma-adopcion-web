using System.ComponentModel.DataAnnotations;

namespace API.Domain.Common.Model
{
    public class BaseModel
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public DateTime CreatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime LastUpdatedAt { get; set; }
        public Guid? UpdatedBy { get; set; }
    }
}
