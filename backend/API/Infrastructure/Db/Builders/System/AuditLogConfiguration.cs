using API.Domain.Model.System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.System
{
    public class AuditLogConfiguration : IEntityTypeConfiguration<AuditLog>
    {
        public void Configure(EntityTypeBuilder<AuditLog> builder)
        {
            builder.ToTable("AuditLogs");

            // 1. Llave primaria (Es int, se autoincrementará por defecto)
            builder.HasKey(al => al.Id);

            // 2. Propiedades
            builder.Property(al => al.TableName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(al => al.OldValues)
                .HasColumnType("nvarchar(max)");

            // 3. Índices para rendimiento
            // Fundamental: Buscaremos frecuentemente por tabla y registro para ver el historial
            builder.HasIndex(al => new { al.TableName, al.RecordId });

            // Índice para búsquedas por usuario
            builder.HasIndex(al => al.UserId);

            // 4. Mapeo de Enum
            builder.Property(al => al.AuditType)
                .HasConversion<string>();
        }
    }
}