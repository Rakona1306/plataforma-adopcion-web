using Supabase;

namespace API.Infrastructure.Extensions.Supabase
{
    public static class SupabaseConfig
    {
        public static IServiceCollection
        AddSupabase(
            this IServiceCollection services
        )
        {
            var url =
                Environment.GetEnvironmentVariable(
                    "SUPABASE_URL"
                );

            var key =
                Environment.GetEnvironmentVariable(
                    "SUPABASE_KEY"
                );

            if (
                string.IsNullOrWhiteSpace(url) ||
                string.IsNullOrWhiteSpace(key)
            )
            {
                throw new Exception(
                    "Supabase variables missing"
                );
            }

            var options = new SupabaseOptions
            {
                AutoConnectRealtime = false
            };

            var client = new Client(
                url,
                key,
                options
            );

            client.InitializeAsync().Wait();

            services.AddSingleton(client);

            return services;
        }
    }
}
