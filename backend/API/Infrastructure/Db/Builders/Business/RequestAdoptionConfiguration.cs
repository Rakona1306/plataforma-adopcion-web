using API.Domain.Model.Bussiness;
using API.Domain.Model.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
    public class RequestAdoptionConfiguration : IEntityTypeConfiguration<RequestAdoption>
    {
        public void Configure(EntityTypeBuilder<RequestAdoption> builder)
        {
            builder.HasKey(e => e.Id);

            // ──────────────────── ÍNDICES ────────────────────
            builder.HasIndex(e => e.UserId);
            builder.HasIndex(e => e.PetId);
            builder.HasIndex(e => e.ReviewedBy);
            builder.HasIndex(e => e.Status);
            builder.HasIndex(e => e.CreatedAt);

            // ──────────────────── PROPIEDADES ────────────────────
            builder.Property(e => e.HouseType)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(e => e.Motivation)
                .HasMaxLength(1000)
                .IsRequired();

            builder.Property(e => e.District)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsRequired();

            builder.Property(e => e.Address)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(e => e.Dni)
                .HasMaxLength(8)
                .IsRequired();

            builder.Property(e => e.ReviewComment)
                .HasMaxLength(1000);

            builder.Property(e => e.PlatformProvider)
                .HasConversion<string>()
                .HasDefaultValue(PlatformProvider.Web)
                .IsRequired();

            builder.Property(e => e.Status)
                .HasConversion<string>()
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(e => e.HasOtherPets)
                .HasDefaultValue(false);

            builder.Property(e => e.HasChildren)
                .HasDefaultValue(false);

            builder.Property(e => e.AcceptHomeVisit)
                .HasDefaultValue(false);

            // ──────────────────── RELACIONES ────────────────────

            // Solicitante
            builder.HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Revisor
            builder.HasOne(e => e.Reviewer)
                .WithMany()
                .HasForeignKey(e => e.ReviewedBy)
                .OnDelete(DeleteBehavior.SetNull);

            // Mascota
            builder.HasOne(e => e.Pet)
                .WithMany()
                .HasForeignKey(e => e.PetId)
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
            builder.ToTable("RequestAdoptions");
        }
    }
}