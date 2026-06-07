using API.Domain.Model.Organization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Organization
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            // 1. Propiedades obligatorias y restricciones
            builder.Property(u => u.Name).IsRequired().HasMaxLength(100);
            builder.Property(u => u.LastName).IsRequired().HasMaxLength(100);
            builder.Property(u => u.Email).IsRequired().HasMaxLength(255);
            builder.Property(u => u.Password).IsRequired().HasMaxLength(255);

            // 2. Índices únicos para búsquedas rápidas y validación
            builder.HasIndex(u => u.Email).IsUnique();

            // 3. Propiedades opcionales
            builder.Property(u => u.Dni).HasMaxLength(20);
            builder.Property(u => u.Ruc).HasMaxLength(20);
            builder.Property(u => u.Phone).HasMaxLength(20);
            builder.Property(u => u.District).HasMaxLength(100);

            // 4. Relación con Role
            builder.HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}