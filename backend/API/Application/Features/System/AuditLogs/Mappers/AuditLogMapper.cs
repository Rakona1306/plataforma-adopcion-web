using API.Application.Features.Organization.Roles.Dtos;
using API.Application.Features.System.AuditLogs.Dtos;
using API.Domain.Model.Organization;
using API.Domain.Model.System;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.System.AuditLogs.Mappers
{
    [Mapper]
    public partial class AuditLogMapper
    {
        public partial AuditLog ToEntity(AuditLogResponse dto);
        public partial AuditLogResponse ToResponse(AuditLog auditLog);
        public partial List<RoleResponse> ToResponseList(List<AuditLog> auditLogs);
    }
}
