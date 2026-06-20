using API.Domain.Common.Model;

namespace API.Application.Helpers
{
    public static class AuditHelper
    {
        public static void CreateAudit(
            BaseModel entity,
            Guid? userId
        )
        {
            entity.CreatedAt = DateTime.UtcNow;
            entity.LastUpdatedAt = DateTime.UtcNow;
            entity.CreatedBy = userId;
            entity.UpdatedBy = userId;
        }

        public static void UpdateAudit(
            BaseModel entity,
            Guid? userId
        )
        {
            entity.LastUpdatedAt = DateTime.UtcNow;
            entity.UpdatedBy = userId;
        }
    }
}
