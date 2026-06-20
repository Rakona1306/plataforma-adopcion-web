using API.Domain.Model.Bussiness;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{

    public class DonationConfiguration : IEntityTypeConfiguration<Donation>
    {
        public void Configure(EntityTypeBuilder<Donation> builder)
        {
            // 1. Configuración de tabla y llaves (Herencia de BaseModel)
            builder.ToTable("Donations");
            builder.HasKey(d => d.Id);

            // 2. Configuración de columnas
            builder.Property(d => d.Amount)
                .IsRequired()
                .HasPrecision(18, 2); // Buena práctica para dinero

            builder.Property(d => d.Currency)
                .IsRequired()
                .HasMaxLength(3)
                .HasDefaultValue("PEN");

            builder.Property(d => d.PaymentProvider)
                .HasMaxLength(100);

            builder.Property(d => d.TransactionId)
                .HasMaxLength(255);

            // 3. Configuración de Relaciones (Foreign Key)
            builder.HasOne(d => d.User)
                .WithMany() // O .WithMany(u => u.Donations)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict); // Evita borrado accidental de usuarios con donaciones

            // 4. Mapeo de Enums (Opcional: guardar como string o int)
            // Por defecto EF Core guarda el int, si prefieres el nombre (string):
            builder.Property(d => d.Type)
                .HasConversion<string>();

            builder.Property(d => d.Status)
                .HasConversion<string>();
        }
    }
}
