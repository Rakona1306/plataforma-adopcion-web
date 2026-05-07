using System.ComponentModel.DataAnnotations;

namespace API.Domain.Common.Model
{
    public class BaseModel
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
        public DateTime LastUpdatedAt { get; set; }
        public int UpdatedBy { get; set; }
    }
}
