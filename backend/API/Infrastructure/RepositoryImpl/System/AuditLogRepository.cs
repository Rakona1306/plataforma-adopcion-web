using API.Domain.Model.Enums;
using API.Domain.Model.System;
using API.Domain.Repository.System;
using API.Infrastructure.Db;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace API.Infrastructure.RepositoryImpl.System
{
    public class AuditLogRepository : IAuditLogRepository
    {
        private readonly ConnDbContext _context;
        public AuditLogRepository(ConnDbContext context) {
            _context = context;
        }
        public async Task CreateAsync<T>(AuditEnum auditEnum, Guid recordId, string tableName, Guid? userId, T? oldValues)
        {
            var query = _context.AuditLogs;
            AuditLog entity = new()
            {
                RecordId = recordId,
                TableName = tableName,
                AuditType = auditEnum,
                CreatedAt = DateTime.UtcNow,
                UserId = userId,
                OldValues = oldValues is null
                    ? null
                    : JsonSerializer.Serialize(oldValues)
            };

            await query.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<List<AuditLog>> GetAllAsync()
        {
            var query = _context.AuditLogs;
            return await query.ToListAsync();
        }

        public async Task<List<AuditLog>> GetInteractionsAsync(int page, int pageSize, Guid recordId, string tableName)
        {
            IQueryable<AuditLog> query = _context.AuditLogs.AsNoTracking();
            query = query.Where(x => x.RecordId == recordId);
            query = query.Where(x => x.TableName == tableName);

            return await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
    }
}
