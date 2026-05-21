using API.Domain.Model.Shelter;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Shelter
{
    public class PetCharacterConfiguration : IEntityTypeConfiguration<PetCharacter>
    {
        public void Configure(EntityTypeBuilder<PetCharacter> builder)
        {
            builder.HasKey(pc => pc.Id);
            builder.Property(pc => pc.Name).IsRequired().HasMaxLength(100);
        }
    }
}
