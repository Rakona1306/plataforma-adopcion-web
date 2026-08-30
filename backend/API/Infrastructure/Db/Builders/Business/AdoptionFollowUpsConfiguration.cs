using API.Domain.Model.Bussiness;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
       public class AdoptionFollowUpConfiguration : IEntityTypeConfiguration<AdoptionFollowUp>
       {
              public void Configure(EntityTypeBuilder<AdoptionFollowUp> builder)
              {
                     // Nombre de la tabla
                     builder.ToTable("AdoptionFollowUps");

                     // Clave primaria
                     builder.HasKey(x => x.Id);

                     // Configuración de propiedades
                     builder.Property(x => x.Notes)
                            .HasMaxLength(1000)
                            .IsRequired();

                     builder.Property(x => x.FollowUpDate)
                            .IsRequired();

                     builder.Property(x => x.Type)
                            .IsRequired()
                            .HasConversion<string>();

                     builder.Property(x => x.Status)
                            .IsRequired()
                            .HasConversion<string>();


                     // Índices
                     builder.HasIndex(x => x.AdoptionId);
                     builder.HasIndex(x => x.FollowUpDate);
                     builder.HasIndex(x => new { x.AdoptionId, x.FollowUpDate });

                     // Relación con Adoption
                     builder.HasOne(x => x.Adoption)
                            .WithMany(x => x.FollowUps)
                            .HasForeignKey(x => x.AdoptionId)
                            .OnDelete(DeleteBehavior.Cascade);
              }
       }
}