using API.Domain.Model.Bussiness;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{

    public class DonationConfiguration : IEntityTypeConfiguration<Donation>
    {
        public void Configure(EntityTypeBuilder<Donation> builder)
        {
            // Nombre de la tabla
            builder.ToTable("Donations");

            // Clave primaria
            builder.HasKey(x => x.Id);

            // === Configuración de propiedades ===

            builder.Property(x => x.DonationDate)
                   .IsRequired();

            // === Campos de auditoría (heredados de BaseModelInt) ===

            builder.Property(x => x.CreatedAt)
                   .IsRequired();

            builder.Property(x => x.LastUpdatedAt)
                   .IsRequired();

            // === Índices ===

            builder.HasIndex(x => x.RequestDonationId);
            builder.HasIndex(x => x.DonationDate);
            builder.HasIndex(x => new { x.RequestDonationId, x.DonationDate });

            // === Relaciones ===

            // Relación con RequestDonation (uno a muchos)
            builder.HasOne(x => x.RequestDonation)
                   .WithMany()
                   .HasForeignKey(x => x.RequestDonationId)
                   .OnDelete(DeleteBehavior.Restrict);

            // Relación con FollowUps (uno a muchos)
            builder.HasMany(x => x.FollowUps)
                   .WithOne(x => x.Donation)
                   .HasForeignKey(x => x.DonationId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
