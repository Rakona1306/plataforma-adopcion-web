using API.Domain.Model.Shelter;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Shelter
{
    public class PetBreedConfiguration : IEntityTypeConfiguration<PetBreed>
    {
        public void Configure(EntityTypeBuilder<PetBreed> builder)
        {
            // Llave primaria compuesta ya que es una tabla intermedia con payload (Percentage)
            builder.HasKey(pb => new { pb.PetId, pb.BreedId });

            builder.HasOne(pb => pb.Pet)
                   .WithMany(p => p.PetBreeds)
                   .HasForeignKey(pb => pb.PetId);

            builder.HasOne(pb => pb.Breed)
                   .WithMany(b => b.PetBreeds)
                   .HasForeignKey(pb => pb.BreedId);

            builder.Property(pb => pb.Percentage).IsRequired().HasDefaultValue(100);
        }
    }
}
