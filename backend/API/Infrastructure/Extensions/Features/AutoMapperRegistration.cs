using System.Reflection;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;

namespace API.Infrastructure.Extensions.Features
{
    public static class AutoMapperRegistration
    {
        public static IServiceCollection AddAutoMapperFromAssemblies(
            this IServiceCollection services,
            IConfiguration configuration,
            params Assembly[] assemblies)
        {
            // Buscar todos los tipos Profile en los assemblies
            var profileTypes = assemblies
                .SelectMany(a => a.GetTypes())
                .Where(t => typeof(Profile).IsAssignableFrom(t) && !t.IsAbstract)
                .ToArray();

            if (profileTypes.Length == 0)
            {
                throw new InvalidOperationException(
                    "No se encontraron perfiles de AutoMapper en los assemblies proporcionados.");
            }

            var licenseKey = configuration["AUTOMAPPER_KEY"]
                ?? throw new InvalidOperationException(
                    "No se encontró la variable AUTOMAPPER_LICENSE en la configuración.");

            // Usar la sobrecarga correcta: solo tipos marcadores
            services.AddAutoMapper(cfg => cfg.LicenseKey = licenseKey, profileTypes);

            return services;
        }

        /// <summary>
        /// Registra automáticamente todos los perfiles de AutoMapper 
        /// a partir de tipos marcadores de cada assembly.
        /// </summary>
        public static IServiceCollection AddAutoMapperFromApplication(
            this IServiceCollection services,
            IConfiguration configuration,
            params Type[] markerTypes)
        {
            var licenseKey = configuration["AUTOMAPPER_KEY"]
                ?? throw new InvalidOperationException(
                    "No se encontró la variable AUTOMAPPER_LICENSE en la configuración.");
            // Pasar directamente los tipos marcadores a AddAutoMapper
            services.AddAutoMapper(cfg => cfg.LicenseKey = licenseKey, markerTypes);
            return services;
        }
    }
}