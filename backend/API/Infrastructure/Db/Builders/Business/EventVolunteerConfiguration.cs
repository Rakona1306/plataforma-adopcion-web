using API.Domain.Model.Bussiness;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
    public class EventVolunteerConfiguration : IEntityTypeConfiguration<EventVolunteer>
    {
        public void Configure(EntityTypeBuilder<EventVolunteer> builder)
        {
            builder.ToTable("EventVolunteers");

            // 1. Llave primaria compuesta para asegurar unicidad
            builder.HasKey(ev => new { ev.EventId, ev.UserId });

            // 2. Definición de relaciones
            // Relación con Evento
            builder.HasOne(ev => ev.Event)
                .WithMany(e => e.Volunteers)
                .HasForeignKey(ev => ev.EventId)
                .OnDelete(DeleteBehavior.Restrict);

            // Relación con Usuario
            builder.HasOne(ev => ev.User)
                .WithMany() // Ajusta si en tu entidad User tienes la colección Volunteers
                .HasForeignKey(ev => ev.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // 3. Propiedades
            builder.Property(ev => ev.JoinedAt)
                .IsRequired();

            builder.Property(ev => ev.Attended)
                .HasDefaultValue(false);
        }
    }
}