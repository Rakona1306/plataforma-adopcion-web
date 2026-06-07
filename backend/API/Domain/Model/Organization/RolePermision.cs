using System.ComponentModel.DataAnnotations;

namespace API.Domain.Model.Organization
{
    public class RolePermission
    {
        [Key]
        public int Id { get; set; }
        public Guid RoleId { get; set; }

        public Role Role { get; set; }
            = null!;

        public Guid PermissionId { get; set; }

        public Permission Permission { get; set; }
            = null!;
    }
}
