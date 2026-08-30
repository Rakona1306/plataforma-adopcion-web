using API.Domain.Model.Bussiness;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
    public class GivingConfiguration : IEntityTypeConfiguration<Giving>
    {
        public void Configure(EntityTypeBuilder<Giving> builder)
        {
            // 1. Nombre de la tabla (Opcional, ajusta según tu estándar de pluralización)
            builder.ToTable("Givings");

            // 2. Llave primaria (Heredada de BaseModelInt)
            builder.HasKey(x => x.Id);

            // 3. Propiedades y Tipos de Datos
            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(150); // Buenas prácticas: limitar los strings para evitar nvarchar(max)

            builder.Property(x => x.Amount)
                .HasPrecision(10, 2) // Configuración limpia sin depender de DataAnnotations
                .IsRequired(false);

            builder.Property(x => x.Quantity)
                .HasPrecision(10, 2)
                .IsRequired(false);

            builder.Property(x => x.Kg)
                .HasPrecision(10, 2)
                .IsRequired(false);

            // 4. Configuración de Enums
            // Nota: Por defecto, EF Core guarda los enums como INTEGER en la base de datos (Ej: MONEY = 1).
            // Si prefieres guardarlos como STRING en texto plano, descomenta las líneas '.HasConversion<string>()'.

            builder.Property(x => x.Type)
                .IsRequired()
                .HasConversion<string>(); // Opcional: Guarda "MONEY" / "GOODS" en lugar de 1 / 2

            builder.Property(x => x.Unit)
                .IsRequired(false)
                .HasConversion<string>(); // Opcional: Guarda "KG" / "GRAMS" etc.

            builder.Property(x => x.CreatedAt)
                .IsRequired();

            builder.Property(x => x.LastUpdatedAt)
                .IsRequired();

            builder.Property(x => x.CreatedBy)
                .IsRequired(false);

            builder.Property(x => x.UpdatedBy)
                .IsRequired(false);
        }
    }
}