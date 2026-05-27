using API.Domain.Model.Bussiness;
using API.Domain.Model.Checkout;
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

        // --- Módulo: Organización (Users, Roles, Permissions) ---
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }

        // --- Módulo: Bussiness (Events, Requests, Donations) ---
        public DbSet<Donation> Donations { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventPhoto> EventPhotos { get; set; }
        public DbSet<EventVolunteer> EventVolunteers { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<VolunteerApplication> VolunteerAplications { get; set; }
        public DbSet<VolunteerArea> VolunteerAreas { get; set; }

        // --- Módulo: Shelter (Pets, Medical, Traits, Breeds) ---
        public DbSet<Pet> Pets { get; set; }
        public DbSet<Breed> Breeds { get; set; }
        public DbSet<MedicalRecord> MedicalRecords { get; set; }
        public DbSet<PetBreed> PetBreeds { get; set; }
        public DbSet<PetPhoto> PetPhotos { get; set; }
        public DbSet<PetSponsor> PetSponsors { get; set; }
        public DbSet<PetTrait> PetTraits { get; set; }
        public DbSet<PetVaccine> PetVaccines { get; set; }
        public DbSet<Specie> Species { get; set; }
        public DbSet<Trait> Traits { get; set; }
        public DbSet<TraitCategory> TraitCategories { get; set; }
        public DbSet<Vaccine> Vacines { get; set; } // Nota: Corregí el nombre basado en tu archivo 'Vacine.cs'

        // --- Módulo: Checkout ---
        public DbSet<PaymentHistory> PaymentHistories { get; set; }

        // --- Módulo: System ---
        public DbSet<AuditLog> AuditLogs { get; set; }

        protected override void OnModelCreating(
        ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(
                Assembly.GetExecutingAssembly());
        }
    }
}
