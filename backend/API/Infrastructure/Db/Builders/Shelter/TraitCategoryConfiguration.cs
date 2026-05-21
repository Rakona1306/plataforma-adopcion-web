using API.Domain.Model.Shelter;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Shelter
{
    public class TraitCategoryConfiguration : IEntityTypeConfiguration<TraitCategory>
    {
        public void Configure(EntityTypeBuilder<TraitCategory> builder)
        {
            builder.HasKey(tc => tc.Id);
            builder.Property(tc => tc.Name).IsRequired().HasMaxLength(100);
            builder.Property(tc => tc.Description).HasMaxLength(250);
        }
    }
}
