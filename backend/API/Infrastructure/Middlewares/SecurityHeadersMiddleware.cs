using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Infrastructure.Middlewares
{
    public class SecurityHeadersMiddleware
    {
        private readonly RequestDelegate _next;

        public SecurityHeadersMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            context.Response.Headers["X-Content-Type-Options"] = "nosniff";
            context.Response.Headers["X-Frame-Options"] = "DENY";
            context.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
            context.Response.Headers["X-XSS-Protection"] = "0";
            context.Response.Headers["Content-Security-Policy"] = "default-src 'none'; frame-ancestors 'none'";
            context.Response.Headers["Permissions-Policy"] = "geolocation=(), camera=(), microphone=()";
            context.Response.Headers.Remove("Server");
            context.Response.Headers.Remove("X-Powered-By");

            await _next(context);
        }
    }
}