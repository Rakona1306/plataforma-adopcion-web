using API.Domain.Model.Bussiness;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
    public class PricingDonationConfiguration : IEntityTypeConfiguration<PricingDonation>
    {
        public void Configure(EntityTypeBuilder<PricingDonation> builder)
        {
            // ──────────────────── TABLA ────────────────────
            builder.ToTable("PricingDonations");
            builder.HasKey(e => e.Id);

            // ──────────────────── ÍNDICES ────────────────────
            builder.HasIndex(e => e.GivingId);
            builder.HasIndex(e => e.IsActive);
            builder.HasIndex(e => e.IsFeatured);

            // ──────────────────── PROPIEDADES ────────────────────
            builder.Property(e => e.Title)
                .HasMaxLength(150)
                .IsRequired();

            builder.Property(e => e.Description)
                .HasMaxLength(500)
                .IsRequired();

            builder.Property(e => e.Benefits)
                .HasMaxLength(1000);

            builder.Property(e => e.IsFeatured)
                .HasDefaultValue(false);

            builder.Property(e => e.IsActive)
                .HasDefaultValue(true);

            // ──────────────────── RELACIONES ────────────────────
            builder.HasOne(e => e.Giving)
                .WithMany(g => g.PricingDonations)
                .HasForeignKey(e => e.GivingId)
                .OnDelete(DeleteBehavior.Cascade);

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