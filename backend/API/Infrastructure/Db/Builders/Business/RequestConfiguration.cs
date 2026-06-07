using API.Domain.Model.Bussiness;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
    public class RequestConfiguration : IEntityTypeConfiguration<Request>
    {
        public void Configure(EntityTypeBuilder<Request> builder)
        {
            builder.ToTable("Requests");

            // --- Relaciones ---

            // 1. Solicitante (User)
            builder.HasOne(r => r.User)
                .WithMany()
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // 2. Revisor (Reviewer) - FK Explícita para evitar conflicto con UserId
            builder.HasOne(r => r.Reviewer)
                .WithMany()
                .HasForeignKey(r => r.ReviewedBy)
                .OnDelete(DeleteBehavior.Restrict);

            // 3. Mascota (Opcional)
            builder.HasOne(r => r.Pet)
                .WithMany()
                .HasForeignKey(r => r.PetId)
                .OnDelete(DeleteBehavior.SetNull);

            // 4. Área de Voluntariado (Opcional)
            builder.HasOne(r => r.VolunteerArea)
                .WithMany()
                .HasForeignKey(r => r.VolunteerAreaId)
                .OnDelete(DeleteBehavior.SetNull);

            // --- Propiedades ---

            builder.Property(r => r.Motivation).IsRequired().HasMaxLength(1000);
            builder.Property(r => r.Notes).HasMaxLength(1000);

            // Enums
            builder.Property(r => r.Type).HasConversion<string>();
            builder.Property(r => r.Status).HasConversion<string>();

            // Financieros
            builder.Property(r => r.DonationAmount).HasPrecision(18, 2);
            builder.Property(r => r.SponsorshipAmount).HasPrecision(18, 2);
        }
    }
}