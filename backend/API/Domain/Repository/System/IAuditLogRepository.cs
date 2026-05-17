using API.Domain.Common.Model;
using API.Domain.Model.Enums;
using API.Domain.Model.System;
using System.Collections.ObjectModel;

namespace API.Domain.Repository.System
{
    public interface IAuditLogRepository
    {
        public Task CreateAsync<T>(AuditEnum auditEnum, Guid recordId, string tableName, Guid? userId, T? oldValues);
        public Task<List<AuditLog>> GetAllAsync();
        public Task<Paginate<AuditLog>> GetInteractionsAsync(int page, int pageSize, Guid recordId, string tableName);
    }
}
