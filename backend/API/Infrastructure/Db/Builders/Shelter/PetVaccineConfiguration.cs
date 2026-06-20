using API.Domain.Model.Shelter;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Shelter
{
    public class PetVaccineConfiguration : IEntityTypeConfiguration<PetVaccine>
    {
        public void Configure(EntityTypeBuilder<PetVaccine> builder)
        {
            // Al heredar de BaseModel, tiene su propia Id PK única. Una mascota puede recibir la misma vacuna en distintas fechas.
            builder.HasKey(pv => pv.Id);

            builder.HasOne(pv => pv.Pet)
                   .WithMany() // Si no definiste colección en Pet, se deja vacío
                   .HasForeignKey(pv => pv.PetId);

            builder.HasOne(pv => pv.Vaccine)
                   .WithMany()
                   .HasForeignKey(pv => pv.VaccineId);

            builder.Property(pv => pv.AppliedDate).IsRequired();
        }
    }
}
