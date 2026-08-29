using API.Domain.Common.Model;
using API.Domain.Model.Enums;
using API.Domain.Model.System;
using System.Collections.ObjectModel;

namespace API.Domain.Repository.System
{
    public interface IAuditLogRepository
    {
        public Task CreateAsync<T>(AuditEnum auditEnum, string recordId, string tableName, Guid? userId, T? oldValues);
        public Task<List<AuditLog>> GetAllAsync();
        public Task<Paginate<AuditLog>> GetInteractionsAsync(int page, int pageSize, string recordId, string tableName);
    }
}
