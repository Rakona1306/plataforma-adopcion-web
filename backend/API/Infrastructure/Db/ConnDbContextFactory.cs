using API.Infrastructure.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace API.Infrastructure.Db;

public class ConnDbContextFactory : IDesignTimeDbContextFactory<ConnDbContext>
{
    public ConnDbContext CreateDbContext(string[] args)
    {
        var envPath = Path.Combine(
            Directory.GetCurrentDirectory(),
            "production.env"
        );

        if (!File.Exists(envPath))
        {
            throw new FileNotFoundException(
                $"No se encontró el archivo: {envPath}"
            );
        }

        DotEnvLoader.Load(envPath);

        var connectionString =
            Environment.GetEnvironmentVariable(
                "ConnectionStrings__DefaultConnection"
            );

        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException(
                "No se encontró ConnectionStrings__DefaultConnection en production.env"
            );
        }

        var optionsBuilder =
            new DbContextOptionsBuilder<ConnDbContext>();

        optionsBuilder.UseNpgsql(
            connectionString,
            options => options.CommandTimeout(60)
        );

        return new ConnDbContext(optionsBuilder.Options);
    }
}