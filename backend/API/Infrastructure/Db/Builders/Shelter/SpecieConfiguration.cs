using API.Domain.Model.Shelter;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Shelter
{
    public class SpecieConfiguration : IEntityTypeConfiguration<Specie>
    {
        public void Configure(EntityTypeBuilder<Specie> builder)
        {
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Name).IsRequired().HasMaxLength(50);

            // Índice único para evitar especies duplicadas
            builder.HasIndex(s => s.Name).IsUnique();
        }
    }
}
