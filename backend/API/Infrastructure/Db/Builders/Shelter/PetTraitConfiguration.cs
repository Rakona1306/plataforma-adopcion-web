using API.Domain.Model.Shelter;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Shelter
{
    public class PetTraitConfiguration : IEntityTypeConfiguration<PetTrait>
    {
        public void Configure(EntityTypeBuilder<PetTrait> builder)
        {
            // Llave primaria compuesta para relación Many-to-Many pura
            builder.HasKey(pt => pt.Id);

            builder.HasOne(pt => pt.Pet)
                  .WithMany(p => p.PetTraits)
                  .HasForeignKey(pt => pt.PetId)
                  .OnDelete(DeleteBehavior.Cascade);

            // Relación con Trait
            builder.HasOne(pt => pt.Trait)
                   .WithMany()
                   .HasForeignKey(pt => pt.TraitId)
                   .OnDelete(DeleteBehavior.Restrict);

            // Índice único
            builder.HasIndex(pt => new { pt.PetId, pt.TraitId })
                   .IsUnique();
        }
    }
}
