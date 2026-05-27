using API.Domain.Model.Checkout;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Checkout
{
    public class PaymentHistoryConfiguration : IEntityTypeConfiguration<PaymentHistory>
    {
        public void Configure(EntityTypeBuilder<PaymentHistory> builder)
        {
            builder.ToTable("PaymentHistories");

            // 1. Propiedades Financieras
            builder.Property(ph => ph.Amount)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.Property(ph => ph.Currency)
                .IsRequired()
                .HasMaxLength(3)
                .HasDefaultValue("PEN");

            // 2. Propiedades de Pago
            builder.Property(ph => ph.Provider)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(ph => ph.TransactionId)
                .HasMaxLength(255);

            // RawResponse suele contener JSONs de la API de pagos (ej: Stripe/PayPal)
            // Usamos HasMaxLength(-1) o un valor grande si esperas mucha data
            builder.Property(ph => ph.RawResponse)
                .HasColumnType("nvarchar(max)");

            // 3. Relaciones
            builder.HasOne(ph => ph.User)
                .WithMany()
                .HasForeignKey(ph => ph.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // 4. Enums
            builder.Property(ph => ph.Status)
                .HasConversion<string>();
        }
    }
}