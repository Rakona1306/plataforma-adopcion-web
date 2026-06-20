using API.Domain.Model.Bussiness;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
    public class EventPhotoConfiguration : IEntityTypeConfiguration<EventPhoto>
    {
        public void Configure(EntityTypeBuilder<EventPhoto> builder)
        {
            builder.ToTable("EventPhotos");

            builder.Property(ep => ep.Url)
                .IsRequired()
                .HasMaxLength(500);

            // Relación con Evento
            builder.HasOne(ep => ep.Event)
                .WithMany(e => e.Photos)
                .HasForeignKey(ep => ep.EventId)
                .OnDelete(DeleteBehavior.Cascade);

            // Índice para mejorar el rendimiento si buscas fotos por evento
            builder.HasIndex(ep => ep.EventId);
        }
    }
}
