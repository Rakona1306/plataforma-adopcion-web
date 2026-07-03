using API.Domain.Model.Shelter;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Shelter
{
    public class PetVaccineConfiguration : IEntityTypeConfiguration<PetVaccine>
    {
        public void Configure(EntityTypeBuilder<PetVaccine> builder)
        {
            builder.HasKey(pv => pv.Id);

            // Relación con Pet - EXPLÍCITA
            builder.HasOne(pv => pv.Pet)
                   .WithMany(p => p.PetVaccines)
                   .HasForeignKey(pv => pv.PetId)
                   .OnDelete(DeleteBehavior.Cascade);

            // Relación con Vaccine
            builder.HasOne(pv => pv.Vaccine)
                   .WithMany()
                   .HasForeignKey(pv => pv.VaccineId)
                   .OnDelete(DeleteBehavior.Restrict);

            // Índices para mejorar rendimiento
            builder.HasIndex(pv => pv.PetId);
            builder.HasIndex(pv => pv.VaccineId);
        }
    }
}
