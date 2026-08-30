
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;

namespace API.Infrastructure.Extensions.Ratelimit
{
    public static class RateLimitingExtensions
    {
        public const string PublicApiPolicy = "PublicApiPolicy";

        public static IServiceCollection AddAppRateLimiting(this IServiceCollection services)
        {
            services.AddRateLimiter(options =>
            {
                options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

                options.OnRejected = async (context, cancellationToken) =>
                {
                    context.HttpContext.Response.Headers["Retry-After"] = "60";
                    context.HttpContext.Response.ContentType = "application/json";
                    await context.HttpContext.Response.WriteAsync(
                        """{"error":"Too many requests. Please try again later."}""",
                        cancellationToken);
                };

                options.AddPolicy(PublicApiPolicy, httpContext =>
                {
                    var ipAddress = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";

                    return RateLimitPartition.GetFixedWindowLimiter(ipAddress, _ => new FixedWindowRateLimiterOptions
                    {
                        PermitLimit = 100,
                        Window = TimeSpan.FromMinutes(1),
                        QueueLimit = 0,
                        QueueProcessingOrder = QueueProcessingOrder.OldestFirst
                    });
                });
            });

            return services;
        }

        public static IApplicationBuilder UseAppRateLimiting(this IApplicationBuilder app)
        {
            app.UseRateLimiter();
            return app;
        }
    }
}