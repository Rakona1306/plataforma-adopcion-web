using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Model.Bussiness;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
    public class RequestDonationConfiguration : IEntityTypeConfiguration<RequestDonation>
    {
        public void Configure(EntityTypeBuilder<RequestDonation> builder)
        {
            builder.HasKey(e => e.Id);

            // ──────────────────── ÍNDICES ────────────────────
            builder.HasIndex(e => e.UserId);
            builder.HasIndex(e => e.PlanDonationId);
            builder.HasIndex(e => e.ReviewedBy);
            builder.HasIndex(e => e.Status);
            builder.HasIndex(e => e.Provider);
            builder.HasIndex(e => e.CreatedAt);

            // ──────────────────── PROPIEDADES ────────────────────
            builder.Property(e => e.Message)
                .HasMaxLength(1000);

            builder.Property(e => e.ReviewComment)
                .HasMaxLength(1000);

            builder.Property(e => e.Status)
                .HasConversion<string>()
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(e => e.Provider)
                .HasConversion<string>()
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(e => e.Amount)
                .HasPrecision(10, 2)
                .IsRequired();

            builder.Property(e => e.IsMonthly)
                .HasDefaultValue(false);

            builder.Property(e => e.IsYearly)
                .HasDefaultValue(false);

            builder.Property(e => e.IsOneTime)
                .HasDefaultValue(true);

            // ──────────────────── RELACIONES ────────────────────

            // Usuario que realiza la donación
            builder.HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Usuario que revisa la donación
            builder.HasOne(e => e.Reviewer)
                .WithMany()
                .HasForeignKey(e => e.ReviewedBy)
                .OnDelete(DeleteBehavior.SetNull);

            // Plan de donación
            builder.HasOne(e => e.PlanDonation)
                .WithMany()
                .HasForeignKey(e => e.PlanDonationId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.Property(x => x.CreatedAt)
                .IsRequired();

            builder.Property(x => x.LastUpdatedAt)
                .IsRequired();

            builder.Property(x => x.CreatedBy)
                .IsRequired(false);

            builder.Property(x => x.UpdatedBy)
                .IsRequired(false);

            // ──────────────────── TABLA ────────────────────
            builder.ToTable("RequestDonations");
        }
    }
}