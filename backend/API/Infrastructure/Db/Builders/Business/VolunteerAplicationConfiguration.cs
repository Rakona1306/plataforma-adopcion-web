using API.Domain.Model.Bussiness;
using API.Domain.Model.Enums;
using API.Domain.Model.Organization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
    public class VolunteerApplicationConfiguration : IEntityTypeConfiguration<VolunteerApplication>
    {
        public void Configure(EntityTypeBuilder<VolunteerApplication> builder)
        {
            builder.ToTable("VolunteerApplications");

            // --- Relaciones ---

            // 1. Solicitante (User)
            builder.HasOne(va => va.User)
                .WithMany() // O .WithMany(u => u.VolunteerApplications)
                .HasForeignKey(va => va.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // 2. Área de Voluntariado
            builder.HasOne(va => va.VolunteerArea)
                .WithMany() // O .WithMany(va => va.Applications)
                .HasForeignKey(va => va.VolunteerAreaId)
                .OnDelete(DeleteBehavior.Restrict);

            // 3. Aprobador (User opcional)
            // Vinculamos la propiedad ApprovedBy con la navegación (User)
            builder.HasOne<User>()
                .WithMany()
                .HasForeignKey(va => va.ApprovedBy)
                .OnDelete(DeleteBehavior.SetNull);

            // --- Propiedades ---

            builder.Property(va => va.Motivation)
                .IsRequired()
                .HasMaxLength(1000);

            // Mapeo del Enum
            builder.Property(va => va.Status)
                .HasConversion<string>()
                .HasDefaultValue(VolunteerStatus.PENDING);
        }
    }
}