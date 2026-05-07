using API.Domain.Model;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace API.Infrastructure.Db
{
    public class ConnDbContext: DbContext
    {
        public ConnDbContext(DbContextOptions<ConnDbContext> options) : base(options) { }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(
        ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(
                Assembly.GetExecutingAssembly());
        }
    }
}
