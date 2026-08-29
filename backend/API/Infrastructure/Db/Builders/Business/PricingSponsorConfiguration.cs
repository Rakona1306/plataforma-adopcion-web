using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Model.Bussiness;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
       public class PricingSponsorConfiguration : IEntityTypeConfiguration<PricingSponsor>
       {
              public void Configure(EntityTypeBuilder<PricingSponsor> builder)
              {
                     // ──────────────────── TABLA ────────────────────
                     builder.ToTable("PricingSponsors");
                     builder.HasKey(e => e.Id);

                     // ──────────────────── ÍNDICES ────────────────────
                     builder.HasIndex(e => e.GivingId);
                     builder.HasIndex(e => e.IsRelevant);
                     builder.HasIndex(e => e.IsActive);

                     // ──────────────────── PROPIEDADES ────────────────────
                     builder.Property(e => e.Name)
                         .HasMaxLength(150)
                         .IsRequired();

                     builder.Property(e => e.Description)
                         .HasMaxLength(500);

                     builder.Property(e => e.Benefits)
                         .HasMaxLength(1000);

                     builder.Property(e => e.IsRelevant)
                         .HasDefaultValue(false);

                     builder.Property(e => e.IsActive)
                         .HasDefaultValue(true);

                     // ──────────────────── RELACIONES ────────────────────
                     builder.HasOne(e => e.Giving)
                         .WithMany(g => g.PricingSponsors)
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