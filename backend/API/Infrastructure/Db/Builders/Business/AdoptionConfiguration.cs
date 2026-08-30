using API.Domain.Model.Bussiness;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
       public class AdoptionConfiguration : IEntityTypeConfiguration<Adoption>
       {
              public void Configure(EntityTypeBuilder<Adoption> builder)
              {
                     // Nombre de la tabla
                     builder.ToTable("Adoptions");

                     // Clave primaria
                     builder.HasKey(x => x.Id);

                     // Configuración de propiedades
                     builder.Property(x => x.AdoptionDate)
                            .IsRequired();

                     // Índices únicos
                     builder.HasIndex(x => x.RequestAdoptionId).IsUnique();

                     builder.HasIndex(x => x.AdoptionDate);

                     builder.Property(x => x.Status)
                            .IsRequired()
                            .HasConversion<string>();

                     builder.Property(x => x.Observations)
                            .HasMaxLength(1000);


                     builder.HasOne(x => x.RequestAdoption)
                            .WithMany()
                            .HasForeignKey(x => x.RequestAdoptionId)
                            .OnDelete(DeleteBehavior.Cascade);

                     // Relación con FollowUps
                     builder.HasMany(x => x.FollowUps)
                            .WithOne(x => x.Adoption)
                            .HasForeignKey(x => x.AdoptionId)
                            .OnDelete(DeleteBehavior.Cascade);
              }
       }
}