using API.Domain.Model.Shelter;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Shelter
{
    public class PetPhotoConfiguration : IEntityTypeConfiguration<PetPhoto>
    {
        public void Configure(EntityTypeBuilder<PetPhoto> builder)
        {
            builder.HasKey(pp => pp.Id);

            builder.Property(pp => pp.Url)
                   .IsRequired()
                   .HasMaxLength(500);

            // Relación con Pet
            builder.HasOne(pp => pp.Pet)
                   .WithMany(p => p.Photos)
                   .HasForeignKey(pp => pp.PetId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(pp => pp.PetId);
        }
    }
}
