using API.Domain.Model.Shelter;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Shelter
{
    public class MedicalRecordConfiguration : IEntityTypeConfiguration<MedicalRecord>
    {
        public void Configure(EntityTypeBuilder<MedicalRecord> builder)
        {
            builder.HasKey(mr => mr.Id);
            builder.Property(mr => mr.Diagnosis).IsRequired().HasMaxLength(500);
            builder.Property(mr => mr.Treatment).HasMaxLength(1000);
            builder.Property(mr => mr.Notes).HasMaxLength(1000);

            builder.HasOne(mr => mr.Pet)
                   .WithMany(p => p.MedicalRecords)
                   .HasForeignKey(mr => mr.PetId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
