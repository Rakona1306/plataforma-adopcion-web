using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain.Common.Model
{
    public class BaseModelInt
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime LastUpdatedAt { get; set; }
        public Guid? UpdatedBy { get; set; }
    }
}