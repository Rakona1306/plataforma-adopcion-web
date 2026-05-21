using System.Reflection;

namespace API.Application.Configuration
{
    public static class ServiceCollection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            var mapperTypes = Assembly.GetExecutingAssembly().GetTypes()
            .Where(t => t.IsClass && !t.IsAbstract && t.Name.EndsWith("Mapper"));

            foreach (var type in mapperTypes) services.AddSingleton(type);

            // 2. 🔥 REGISTRO AUTOMÁTICO DE REPOSITORIOS Y SERVICIOS
            var implementations = Assembly.GetExecutingAssembly().GetTypes()
                .Where(t => t.IsClass && !t.IsAbstract && (
                    t.Name.EndsWith("Repository") ||
                    t.Name.EndsWith("RepositoryImpl") ||
                    t.Name.EndsWith("Service")
                ));

            foreach (var currentClass in implementations)
            {
                // Buscamos las interfaces que implementa esta clase (ej. IRoleRepository)
                var interfaces = currentClass.GetInterfaces();

                foreach (var currentInterface in interfaces)
                {
                    // Evitamos registrar interfaces de .NET (como IDisposable)
                    if (currentInterface.Name.StartsWith("I"))
                    {
                        services.AddScoped(currentInterface, currentClass);
                    }
                }
            }

            return services;
        }
    }
}
