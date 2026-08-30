namespace API.Infrastructure.Extensions.Security
{
    public static class CorsExtensions
    {
        public const string PublicApiCorsPolicy = "PublicApiCors";

        public static IServiceCollection AddAppCors(this IServiceCollection services, IConfiguration configuration)
        {
            // Idealmente los orígenes vienen de appsettings.json (ver nota abajo)
            var allowedOrigins = configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
                ?? ["http://localhost:3000", "http://localhost:5173", "https://plataforma-adopcion-web.vercel.app"];

            services.AddCors(options =>
            {
                options.AddPolicy(PublicApiCorsPolicy, policy =>
                {
                    policy.WithOrigins(allowedOrigins)
                          .WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                          .AllowAnyHeader()
                          .AllowCredentials()
                          .SetIsOriginAllowedToAllowWildcardSubdomains();
                });
            });

            return services;
        }
    }
}