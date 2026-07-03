using API.Domain.Model.Bussiness;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
    public class RequestConfiguration : IEntityTypeConfiguration<Request>
    {
        public void Configure(EntityTypeBuilder<Request> builder)
        {
            builder.HasKey(e => e.Id);

            // ──────────────────── ÍNDICES ────────────────────
            builder.HasIndex(e => e.UserId);
            builder.HasIndex(e => e.PetId);
            builder.HasIndex(e => e.ReviewedBy);
            builder.HasIndex(e => new { e.Status, e.Type });
            builder.HasIndex(e => e.CreatedAt);

            // ──────────────────── PROPIEDADES ────────────────────
            builder.Property(e => e.District)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsRequired();

            builder.Property(e => e.Motivation)
                .HasMaxLength(1000)
                .IsRequired();

            builder.Property(e => e.Notes)
                .HasMaxLength(2000);

            builder.Property(e => e.ReviewComment)
                .HasMaxLength(1000);

            builder.Property(e => e.Type)
                .HasConversion<string>()
                .HasMaxLength(50);

            builder.Property(e => e.Status)
                .HasConversion<string>()
                .HasMaxLength(50);

            // ──────────────────── RELACIONES ────────────────────

            // Request → User (solicitante)
            builder.HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Request → User (revisor)
            builder.HasOne(e => e.Reviewer)
                .WithMany()
                .HasForeignKey(e => e.ReviewedBy)
                .OnDelete(DeleteBehavior.SetNull);

            // Request → Pet (opcional)
            builder.HasOne(e => e.Pet)
                .WithMany()
                .HasForeignKey(e => e.PetId)
                .OnDelete(DeleteBehavior.SetNull);

            // Request → AdoptionDetails (1:1, cascade delete)
            builder.HasOne(e => e.AdoptionDetails)
                .WithOne(ad => ad.Request)
                .HasForeignKey<AdoptionDetails>(ad => ad.RequestId)
                .OnDelete(DeleteBehavior.Cascade);

            // Request → DonationDetails (1:1, cascade delete)
            builder.HasOne(e => e.DonationDetails)
                .WithOne(dd => dd.Request)
                .HasForeignKey<DonationDetails>(dd => dd.RequestId)
                .OnDelete(DeleteBehavior.Cascade);

            // Request → SponsorshipDetails (1:1, cascade delete)
            builder.HasOne(e => e.SponsorshipDetails)
                .WithOne(sd => sd.Request)
                .HasForeignKey<SponsorshipDetails>(sd => sd.RequestId)
                .OnDelete(DeleteBehavior.Cascade);

            // Request → VolunteerDetails (1:1, cascade delete)
            builder.HasOne(e => e.VolunteerDetails)
                .WithOne(vd => vd.Request)
                .HasForeignKey<VolunteerDetails>(vd => vd.RequestId)
                .OnDelete(DeleteBehavior.Cascade);

            // ──────────────────── TABLA ────────────────────
            builder.ToTable("requests");
        }
    }

    public class AdoptionDetailsConfiguration : IEntityTypeConfiguration<AdoptionDetails>
    {
        public void Configure(EntityTypeBuilder<AdoptionDetails> builder)
        {
            builder.HasKey(e => e.Id);

            builder.HasIndex(e => e.RequestId).IsUnique();

            builder.Property(e => e.HouseType)
                .HasMaxLength(100)
                .IsRequired();

            builder.ToTable("adoption_details");
        }
    }

    public class DonationDetailsConfiguration : IEntityTypeConfiguration<DonationDetails>
    {
        public void Configure(EntityTypeBuilder<DonationDetails> builder)
        {
            builder.HasKey(e => e.Id);

            builder.HasIndex(e => e.RequestId).IsUnique();

            builder.Property(e => e.Amount)
                .HasPrecision(10, 2)
                .IsRequired();

            builder.Property(e => e.Message)
                .HasMaxLength(500);

            builder.Property(e => e.NextRecurringDate);

            builder.ToTable("donation_details");
        }
    }

    public class SponsorshipDetailsConfiguration : IEntityTypeConfiguration<SponsorshipDetails>
    {
        public void Configure(EntityTypeBuilder<SponsorshipDetails> builder)
        {
            builder.HasKey(e => e.Id);

            builder.HasIndex(e => e.RequestId).IsUnique();

            builder.Property(e => e.MonthlyAmount)
                .HasPrecision(10, 2)
                .IsRequired();

            builder.Property(e => e.StartDate)
                .IsRequired();

            builder.Property(e => e.EndDate);

            builder.Property(e => e.IsActive)
                .HasDefaultValue(true);

            builder.ToTable("sponsorship_details");
        }
    }

    public class VolunteerDetailsConfiguration : IEntityTypeConfiguration<VolunteerDetails>
    {
        public void Configure(EntityTypeBuilder<VolunteerDetails> builder)
        {
            builder.HasKey(e => e.Id);

            builder.HasIndex(e => e.RequestId).IsUnique();

            builder.HasIndex(e => e.VolunteerAreaId);

            builder.Property(e => e.Experience)
                .HasMaxLength(1000);

            builder.Property(e => e.AvailableHoursPerWeek)
                .IsRequired();

            builder.Property(e => e.IsActive)
                .HasDefaultValue(true);

            // VolunteerDetails → VolunteerArea
            builder.HasOne(e => e.VolunteerArea)
                .WithMany()
                .HasForeignKey(e => e.VolunteerAreaId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.ToTable("volunteer_details");
        }
    }
}