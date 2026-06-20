using API.Domain.Model.Shelter;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Shelter
{
    public class PetConfiguration : IEntityTypeConfiguration<Pet>
    {
        public void Configure(EntityTypeBuilder<Pet> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Description).HasMaxLength(500);
            builder.Property(p => p.RescueStory).HasMaxLength(1000);
            builder.Property(p => p.BirthDate).HasColumnType("date");
            builder.Property(p => p.Age).IsRequired();

            // Configuración de precisión para el peso (ej. 999.99 kg)
            builder.Property(p => p.WeightKg).HasPrecision(5, 2);

            // Mapear Enums como strings en la BD para que sean legibles (Opcional, pero recomendado)
            builder.Property(p => p.Gender).HasConversion<string>().HasMaxLength(20);
            builder.Property(p => p.Size).HasConversion<string>().HasMaxLength(20);
            builder.Property(p => p.Status).HasConversion<string>().HasMaxLength(30);

            // Relación 1:N con Specie (Restringimos cascada para evitar conflictos con Breed)
            builder.HasOne(p => p.Species)
                   .WithMany()
                   .HasForeignKey(p => p.SpeciesId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
