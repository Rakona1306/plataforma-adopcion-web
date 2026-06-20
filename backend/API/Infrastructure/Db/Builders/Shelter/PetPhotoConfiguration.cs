using API.Domain.Model.Shelter;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Shelter
{
    public class PetPhotoConfiguration : IEntityTypeConfiguration<PetPhoto>
    {
        public void Configure(EntityTypeBuilder<PetPhoto> builder)
        {
            builder.HasKey(ph => ph.Id);
            builder.Property(ph => ph.Url).IsRequired().HasMaxLength(500);

            builder.HasOne(ph => ph.Pet)
                   .WithMany(p => p.Photos)
                   .HasForeignKey(ph => ph.PetId)
                   .OnDelete(DeleteBehavior.Cascade); // Si se borra la mascota, se borran sus fotos de la BD
        }
    }
}
