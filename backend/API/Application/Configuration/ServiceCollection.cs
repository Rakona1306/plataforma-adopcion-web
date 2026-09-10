using API.Application.Services.Organization.Users;
using FluentValidation;
using System.Reflection;

namespace API.Application.Configuration
{
    public static class ServiceCollection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)

        {
            var assembly = Assembly.GetExecutingAssembly();

            services.Configure<ExternalApiSettings>(options =>
            {
                options.DniApiBaseUrl = Environment.GetEnvironmentVariable("DNI_API_BASE_URL") ?? string.Empty;
                options.DniApiKey = Environment.GetEnvironmentVariable("DNI_API_KEY") ?? string.Empty;
            });

            services.AddHttpClient<IDniValidationService, DniValidationService>();

            var mapperTypes = Assembly.GetExecutingAssembly().GetTypes()
            .Where(t => t.IsClass && !t.IsAbstract && t.Name.EndsWith("Mapper"));

            foreach (var type in mapperTypes) services.AddSingleton(type);

            var validatorTypes = assembly.GetTypes()
                .Where(t => t.IsClass && !t.IsAbstract);

            foreach (var validatorType in assembly.GetTypes().Where(t => t.IsClass && !t.IsAbstract))
            {
                var baseType = validatorType.BaseType;
                while (baseType != null)
                {
                    if (baseType.IsGenericType && baseType.GetGenericTypeDefinition() == typeof(AbstractValidator<>))
                    {
                        var dtoType = baseType.GetGenericArguments()[0];
                        services.AddScoped(typeof(IValidator<>).MakeGenericType(dtoType), validatorType);
                        break;
                    }
                    baseType = baseType.BaseType;
                }
            }

            var implementations = assembly.GetTypes()
                .Where(t => t.IsClass && !t.IsAbstract && (
                    t.Name.EndsWith("Repository") ||
                    t.Name.EndsWith("RepositoryImpl") ||
                    t.Name.EndsWith("Service")
                ));

            foreach (var currentClass in implementations)
            {
                // Obtenemos TODAS las interfaces que implementa esta clase concreta
                var interfaces = currentClass.GetInterfaces();

                foreach (var iface in interfaces)
                {
                    // Filtramos solo interfaces propias del dominio (empiezan con I y no son de sistema)
                    if (!iface.Name.StartsWith("I") ||
                        iface.Namespace?.StartsWith("System") == true ||
                        iface.Namespace?.StartsWith("Microsoft") == true)
                        continue;

                    // Para servicios genéricos, registramos la interfaz cerrada exacta
                    // Esto funciona AHORA porque PrivateVolunteerApplicationService existe físicamente
                    services.AddScoped(iface, currentClass);
                }
            }

            return services;
        }
    }
}
