using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Model.Bussiness;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
    public class DonationFollowUpConfiguration : IEntityTypeConfiguration<DonationFollowUp>
    {
        public void Configure(EntityTypeBuilder<DonationFollowUp> builder)
        {
            builder.ToTable("DonationFollowUps");

            builder.HasKey(x => x.Id);

            // === Propiedades ===

            builder.Property(x => x.FollowUpDate)
                   .IsRequired();

            builder.Property(x => x.IsPaid)
                   .HasDefaultValue(false);

            builder.Property(x => x.Notes)
                   .HasMaxLength(1000)
                   .IsRequired(false);

            // === Auditoría ===

            builder.Property(x => x.CreatedAt).IsRequired();
            builder.Property(x => x.LastUpdatedAt).IsRequired();

            // === Índices ===

            builder.HasIndex(x => x.DonationId);
            builder.HasIndex(x => x.FollowUpDate);
            builder.HasIndex(x => x.IsPaid);
            builder.HasIndex(x => new { x.DonationId, x.FollowUpDate });

            // === Relaciones ===

            builder.HasOne(x => x.Donation)
                   .WithMany(x => x.FollowUps)
                   .HasForeignKey(x => x.DonationId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}