using API.Application.Features.System.Auths.Mappers;
using API.Infrastructure.Db;
using API.Infrastructure.Extensions.Jwt;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Infrastructure.Middlewares
{
    public class JwtUserMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly JwtOptions _jwtOptions;
        private readonly AuthMapper _mapper;

        public JwtUserMiddleware(
            RequestDelegate next,
            IOptions<JwtOptions> jwtOptions)
        {
            _next = next;
            _jwtOptions = jwtOptions.Value;
            _mapper = new AuthMapper();
        }

        public async Task InvokeAsync(
            HttpContext context,
            ConnDbContext db)
        {
            if (context.Request.Method == "OPTIONS")
            {
                await _next(context);
                return;
            }

            var path = context.Request.Path.Value;

            // 🔓 Rutas públicas
            if (
                path!.Contains("/api/auth/login") ||
                path!.Contains("/api/auth/register") ||
                path!.Contains("/api/roles")
            )
            {
                await _next(context);
                return;
            }

            string? token = null;

            // DEBUG
            Console.WriteLine("---- HEADERS ----");

            foreach (var header in context.Request.Headers)
            {
                Console.WriteLine($"{header.Key}: {header.Value}");
            }

            // 🔹 1️⃣ Leer Authorization (case insensitive)
            if (context.Request.Headers
                .TryGetValue("Authorization",
                    out var authHeader))
            {
                var headerValue =
                    authHeader.FirstOrDefault();

                Console.WriteLine(
                    $"Authorization recibido: {headerValue}");

                if (!string.IsNullOrEmpty(headerValue))
                {
                    if (headerValue
                        .StartsWith("Bearer ",
                            StringComparison
                                .OrdinalIgnoreCase))
                    {
                        token =
                            headerValue
                            .Substring("Bearer ".Length)
                            .Trim();
                    }
                }
            }

            // 🔹 2️⃣ Leer Cookie
            if (string.IsNullOrEmpty(token))
            {
                Console.WriteLine("---- COOKIES ----");

                foreach (var cookie
                    in context.Request.Cookies)
                {
                    Console.WriteLine(
                        $"Cookie: {cookie.Key}");
                }

                if (context.Request.Cookies
                    .TryGetValue(
                        _jwtOptions.CookieName,
                        out var cookieToken))
                {
                    token = cookieToken;
                }
            }

            // 🔴 No hay token
            if (string.IsNullOrEmpty(token))
            {
                Console.WriteLine(
                    "⚠️ No se encontró token");

                context.Response.StatusCode = 401;

                await context.Response
                    .WriteAsJsonAsync(new
                    {
                        message =
                            "Token no proporcionado"
                    });

                return;
            }

            try
            {
                Console.WriteLine(
                    "✅ Token encontrado");

                var tokenHandler =
                    new JwtSecurityTokenHandler();

                var key =
                    Encoding.UTF8.GetBytes(
                        _jwtOptions.Key);

                tokenHandler.ValidateToken(
                    token,
                    new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,

                        IssuerSigningKey =
                            new SymmetricSecurityKey(key),

                        ValidateIssuer = true,
                        ValidIssuer = _jwtOptions.Issuer,

                        ValidateAudience = true,
                        ValidAudience = _jwtOptions.Audience,

                        ClockSkew = TimeSpan.Zero
                    },
                    out SecurityToken validatedToken
                );

                var jwtToken =
                    (JwtSecurityToken)validatedToken;

                // 🔹 Leer claim correcto
                var userIdClaim =
                    jwtToken.Claims
                        .FirstOrDefault(c =>
                            c.Type ==
                            ClaimTypes.NameIdentifier
                            || c.Type == "nameid"
                            || c.Type == "sub");

                if (userIdClaim == null)
                {
                    throw new Exception(
                        "Claim userId no encontrado");
                }

                var userId =
                    Guid.Parse(userIdClaim.Value);

                Console.WriteLine(
                    $"UserId extraído: {userId}");

                var user =
                    await db.Users.Include(x => x.Role).FirstOrDefaultAsync(u => u.Id == userId);

                if (user == null)
                {
                    context.Response.StatusCode = 401;

                    await context.Response
                        .WriteAsJsonAsync(new
                        {
                            message =
                                "Usuario no válido"
                        });

                    return;
                }

                var userMapped = _mapper.ToResponse(user);

                // 🔥 Insertar usuario
                context.Items["User"] = userMapped;

                Console.WriteLine(
                    "✅ Usuario insertado en context");

                await _next(context);
            }
            catch (Exception ex)
            {
                Console.WriteLine(
                    $"❌ Error token: {ex.Message}");

                context.Response.StatusCode = 401;

                await context.Response
                    .WriteAsJsonAsync(new
                    {
                        message =
                            "Token inválido",
                        error = ex.Message
                    });

                return;
            }
        }
    }
}
