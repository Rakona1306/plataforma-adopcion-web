using API.Domain.Model.Bussiness;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
    public class EventConfiguration : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder)
        {
            builder.ToTable("Events");

            builder.Property(e => e.Title)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(e => e.Location)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(e => e.Description)
                .HasMaxLength(2000);

            builder.Property(e => e.BannerUrl)
                .HasMaxLength(500);

        }
    }
}