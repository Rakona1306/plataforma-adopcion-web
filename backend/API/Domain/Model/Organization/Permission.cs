using API.Domain.Common.Model;

namespace API.Domain.Model.Organization
{
    public class Permission : BaseModel
    {
        public string Name { get; set; } = string.Empty;

        public string Module { get; set; }  = string.Empty;

        public ICollection<RolePermission> RolePermissions { get; set; }  = [];
    }
}
