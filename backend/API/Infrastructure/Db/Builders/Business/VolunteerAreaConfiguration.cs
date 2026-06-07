using API.Domain.Model.Bussiness;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
    public class VolunteerAreaConfiguration : IEntityTypeConfiguration<VolunteerArea>
    {
        public void Configure(EntityTypeBuilder<VolunteerArea> builder)
        {
            builder.ToTable("VolunteerAreas");

            // 1. Propiedades
            builder.Property(va => va.Name)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(va => va.Description)
                .HasMaxLength(500);

            // 2. Relación con VolunteerApplication
            // Configuramos la relación 1:N donde un área tiene muchas aplicaciones
            builder.HasMany(va => va.Applications)
                .WithOne(app => app.VolunteerArea)
                .HasForeignKey(app => app.VolunteerAreaId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}