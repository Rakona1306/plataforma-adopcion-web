using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Model.Bussiness;
using API.Domain.Model.Organization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
    public class RequestVolunteerConfiguration : IEntityTypeConfiguration<RequestVolunteer>
    {
        public void Configure(EntityTypeBuilder<RequestVolunteer> builder)
        {
            builder.HasKey(e => e.Id);

            // ──────────────────── ÍNDICES ────────────────────
            builder.HasIndex(e => e.UserId);
            builder.HasIndex(e => e.VolunteerApplicationId);
            builder.HasIndex(e => e.ReviewedBy);
            builder.HasIndex(e => e.Status);
            builder.HasIndex(e => e.RequestDate);
            builder.HasIndex(e => e.CreatedAt);

            // ──────────────────── PROPIEDADES ────────────────────
            builder.Property(e => e.RequestDate)
                .IsRequired();

            builder.Property(e => e.Message)
                .HasMaxLength(1000);

            builder.Property(e => e.ReviewComment)
                .HasMaxLength(1000);

            builder.Property(e => e.Status)
                .HasConversion<string>()
                .HasMaxLength(50)
                .IsRequired();

            // ──────────────────── RELACIONES ────────────────────

            // Usuario solicitante
            builder.HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Usuario revisor
            builder.HasOne<User>()
                .WithMany()
                .HasForeignKey(e => e.ReviewedBy)
                .OnDelete(DeleteBehavior.SetNull);

            // Convocatoria de voluntariado
            builder.HasOne(e => e.VolunteerApplication)
                .WithMany()
                .HasForeignKey(e => e.VolunteerApplicationId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(e => e.Reviewer)
                .WithMany()
                .HasForeignKey(e => e.ReviewedBy)
                .OnDelete(DeleteBehavior.SetNull);

            // ──────────────────── TABLA ────────────────────
            builder.ToTable("RequestVolunteers");
        }
    }
}