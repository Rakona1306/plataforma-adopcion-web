using API.Domain.Model.Shelter;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Shelter
{
    public class BreedConfiguration : IEntityTypeConfiguration<Breed>
    {
        public void Configure(EntityTypeBuilder<Breed> builder)
        {
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Name).IsRequired().HasMaxLength(80);

            // Relación 1:N con Specie
            builder.HasOne(b => b.Species)
                   .WithMany(s => s.Breeds)
                   .HasForeignKey(b => b.SpeciesId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
