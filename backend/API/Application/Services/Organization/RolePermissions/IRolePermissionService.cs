using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Organization.RolePermissions.Dtos;

namespace API.Application.Services.Organization.RolePermissions
{
    public interface IRolePermissionService
    {
        Task<List<RolePermissionResponse>> GetPermissionsByRoleId(Guid roleId);
    }
}