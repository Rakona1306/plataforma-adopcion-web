using API.Domain.Model.Bussiness;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
       public class SponsorConfiguration : IEntityTypeConfiguration<Sponsor>
       {
              public void Configure(EntityTypeBuilder<Sponsor> builder)
              {
                     // Nombre de la tabla
                     builder.ToTable("Sponsors");

                     // Clave primaria
                     builder.HasKey(x => x.Id);

                     // === Campos de auditoría (heredados de BaseModelInt) ===

                     builder.Property(x => x.CreatedAt)
                            .IsRequired();

                     builder.Property(x => x.LastUpdatedAt)
                            .IsRequired();

                     // === Índices ===

                     builder.HasIndex(x => x.RequestSponsorId);

                     // === Relaciones ===

                     // Relación con RequestSponsor (muchos a uno)
                     builder.HasOne(x => x.RequestSponsor)
                            .WithMany()
                            .HasForeignKey(x => x.RequestSponsorId)
                            .OnDelete(DeleteBehavior.Restrict);

                     // Relación con SponsorFollowUps (uno a muchos)
                     builder.HasMany(x => x.SponsorFollowUps)
                            .WithOne(x => x.Sponsor)
                            .HasForeignKey(x => x.SponsorId)
                            .OnDelete(DeleteBehavior.Cascade);
              }
       }
}