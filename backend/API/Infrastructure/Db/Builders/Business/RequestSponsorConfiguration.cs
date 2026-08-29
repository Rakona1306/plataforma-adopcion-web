using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Model.Bussiness;
using API.Domain.Model.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Db.Builders.Business
{
       public class RequestSponsorConfiguration : IEntityTypeConfiguration<RequestSponsor>
       {
              public void Configure(EntityTypeBuilder<RequestSponsor> builder)
              {
                     // Nombre de la tabla
                     builder.ToTable("RequestSponsors");

                     // Clave primaria
                     builder.HasKey(rs => rs.Id);

                     // Configuración de Propiedades
                     builder.Property(rs => rs.Message)
                            .HasMaxLength(1000) // Ajusta según tu regla de negocio
                            .IsRequired(false);

                     builder.Property(rs => rs.Status)
                            .HasDefaultValue(RequestStatus.PENDIENTE)
                            .HasConversion<string>(); // Descomenta si guardas el enum como string en la BD

                     builder.Property(rs => rs.ReviewComment)
                            .HasMaxLength(1000)
                            .IsRequired(false);

                     builder.Property(x => x.Mode)
                            .HasDefaultValue(SponsorMode.MENSUAL)
                            .HasConversion<string>(); // Descomenta si guardas el enum como string en la BD

                     builder.HasIndex(x => x.Mode);

                     // Relaciones (Foreign Keys)

                     // Relación con el Usuario Solicitante
                     builder.HasOne(rs => rs.User)
                            .WithMany() // Si User tiene una colección de RequestSponsors, ponle el nombre aquí
                            .HasForeignKey(rs => rs.UserId)
                            .OnDelete(DeleteBehavior.Cascade);

                     // Relación con la Mascota
                     builder.HasOne(rs => rs.Pet)
                            .WithMany()
                            .HasForeignKey(rs => rs.PetId)
                            .OnDelete(DeleteBehavior.Cascade);

                     // Relación con el Plan de Patrocinio
                     builder.HasOne(rs => rs.PlanSponsor)
                            .WithMany()
                            .HasForeignKey(rs => rs.PlanSponsorId)
                            .OnDelete(DeleteBehavior.SetNull);

                     // Relación con el Usuario Revisor (Puede ser nulo)
                     builder.HasOne(rs => rs.Reviewer)
                            .WithMany()
                            .HasForeignKey(rs => rs.ReviewedBy)
                            .OnDelete(DeleteBehavior.SetNull);

                     builder.Property(x => x.CreatedAt)
                       .IsRequired();

                     builder.Property(x => x.LastUpdatedAt)
                         .IsRequired();

                     builder.Property(x => x.CreatedBy)
                         .IsRequired(false);

                     builder.Property(x => x.UpdatedBy)
                         .IsRequired(false);
              }
       }
}