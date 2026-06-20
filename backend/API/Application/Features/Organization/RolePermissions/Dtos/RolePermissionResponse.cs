using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Bussiness.Permissions.Dtos;

namespace API.Application.Features.Organization.RolePermissions.Dtos
{
    public class RolePermissionResponse
    {
        public Guid Id { get; set; }
        public PermissionResponse permission { get; set; } = new();
    }
}