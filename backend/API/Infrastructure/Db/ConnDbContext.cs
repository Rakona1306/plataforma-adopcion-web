using API.Domain.Model;
using API.Domain.Model.Organization;
using API.Domain.Model.Shelter;
using API.Domain.Model.System;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace API.Infrastructure.Db
{
    public class ConnDbContext : DbContext
    {
        public ConnDbContext(DbContextOptions<ConnDbContext> options) : base(options) { }

        // --- Módulo: Seguridad y Auditoría ---
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }

        // --- Módulo: Catálogos Maestros ---
        public DbSet<Specie> Species { get; set; }
        public DbSet<Breed> Breeds { get; set; }
        public DbSet<TraitCategory> TraitCategories { get; set; }
        public DbSet<Trait> Traits { get; set; }
        public DbSet<Vaccine> Vaccines { get; set; }

        // --- Módulo: Entidades Core y Relaciones ---
        public DbSet<Pet> Pets { get; set; }
        public DbSet<PetBreed> PetBreeds { get; set; }
        public DbSet<PetTrait> PetTraits { get; set; }
        public DbSet<PetPhoto> PetPhoto { get; set; }
        public DbSet<PetVaccine> PetVaccines { get; set; }
        public DbSet<MedicalRecord> MedicalRecords { get; set; }


        protected override void OnModelCreating(
        ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(
                Assembly.GetExecutingAssembly());
        }
    }
}
