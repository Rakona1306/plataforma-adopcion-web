using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Organization.RolePermissions.Dtos;
using API.Domain.Model.Organization;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Organization.RolePermissions.Mappers
{
    [Mapper]
    public partial class RolePermissionMapper
    {
        public partial RolePermissionResponse toResponse(RolePermission entity);
        public partial List<RolePermissionResponse> ToResponseList(List<RolePermission> entityList);
    }
}