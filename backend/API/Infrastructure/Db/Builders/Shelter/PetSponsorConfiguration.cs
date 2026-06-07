using API.Domain.Model.Shelter;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Shelter
{
    public class PetSponsorConfiguration : IEntityTypeConfiguration<PetSponsor>
    {
        public void Configure(EntityTypeBuilder<PetSponsor> builder)
        {
            builder.ToTable("PetSponsors");

            // 1. Llave primaria compuesta
            // Esto asegura que un usuario no cree múltiples patrocinios para la misma mascota (a menos que sea el diseño deseado)
            builder.HasKey(ps => new { ps.UserId, ps.PetId });

            // 2. Propiedades financieras y de tiempo
            builder.Property(ps => ps.MonthlyAmount)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.Property(ps => ps.Notes)
                .HasMaxLength(500);

            // 3. Mapeo de Enums
            builder.Property(ps => ps.Status)
                .HasConversion<string>();

            // 4. Relaciones
            builder.HasOne(ps => ps.User)
                .WithMany() // Ajusta si en 'User' tienes ICollection<PetSponsor>
                .HasForeignKey(ps => ps.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(ps => ps.Pet)
                .WithMany(p => p.PetSponsors) // Asumimos que Pet tiene esta colección
                .HasForeignKey(ps => ps.PetId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}