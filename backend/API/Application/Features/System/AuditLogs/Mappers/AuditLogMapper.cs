using API.Application.Features.System.AuditLogs.Dtos;
using API.Domain.Model.Enums;
using API.Domain.Model.System;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.System.AuditLogs.Mappers
{
    [Mapper]
    public partial class AuditLogMapper
    {
        public partial AuditLog ToEntity(AuditLogResponse dto);

        [MapProperty(
            nameof(AuditLog.AuditType),
            nameof(AuditLogResponse.AuditType)
        )]
        public partial AuditLogResponse ToResponse(AuditLog auditLog);
        public partial List<AuditLogResponse> ToResponseList(List<AuditLog> auditLogs);
        private string MapAuditType(AuditEnum auditType)
        {
            return auditType.ToString();
        }
    }
}
