using API.Domain.Model.Bussiness;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
    public class VolunteerApplicationConfiguration : IEntityTypeConfiguration<VolunteerApplication>
    {
        public void Configure(EntityTypeBuilder<VolunteerApplication> builder)
        {
            builder.HasKey(e => e.Id);

            // ──────────────────── ÍNDICES ────────────────────
            builder.HasIndex(e => e.StartDate);
            builder.HasIndex(e => e.EndDate);
            builder.HasIndex(e => e.Urgency);
            builder.HasIndex(e => e.IsCertified);
            builder.HasIndex(e => e.CreatedAt);

            // ──────────────────── PROPIEDADES ────────────────────
            builder.Property(e => e.Title)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(e => e.SubTitle)
                .HasMaxLength(300);

            builder.Property(e => e.Description)
                .HasMaxLength(5000)
                .IsRequired();

            builder.Property(e => e.Requirements)
                .HasMaxLength(1000);

            builder.Property(e => e.MinAge);

            builder.Property(e => e.MaxAge);

            builder.Property(e => e.Address)
                .HasMaxLength(200);

            builder.Property(e => e.GoogleMapLinkAddress)
                .HasMaxLength(1000);

            builder.Property(e => e.ContactEmail)
                .HasMaxLength(100);

            builder.Property(e => e.ContactPhone)
                .HasMaxLength(20);

            builder.Property(e => e.IsCertified)
                .HasDefaultValue(false);

            builder.Property(e => e.Urgency)
                .HasConversion<string>()
                .HasMaxLength(20)
                .IsRequired();

            // ──────────────────── TABLA ────────────────────
            builder.ToTable("VolunteerApplications");
        }
    }
}