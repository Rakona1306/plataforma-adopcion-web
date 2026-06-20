using API.Application.Features.System.Auths.Mappers;
using API.Infrastructure.Db;
using API.Infrastructure.Extensions.Jwt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Application.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeJwtAttribute : TypeFilterAttribute
    {
        public AuthorizeJwtAttribute() : base(typeof(JwtAuthFilter))
        {
        }
    }

    public class JwtAuthFilter : IAsyncActionFilter
    {
        private readonly JwtOptions _jwtOptions;
        private readonly ConnDbContext _db;
        private readonly AuthMapper _mapper;

        public JwtAuthFilter(IOptions<JwtOptions> jwtOptions, ConnDbContext db)
        {
            _jwtOptions = jwtOptions.Value;
            _db = db;
            _mapper = new AuthMapper(); // Manteniendo tu inicialización exacta
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var httpContext = context.HttpContext;
            string? token = null;

            // 🔹 1️⃣ Leer Authorization Header (case insensitive)
            if (httpContext.Request.Headers.TryGetValue("Authorization", out var authHeader))
            {
                var headerValue = authHeader.FirstOrDefault();
                if (!string.IsNullOrEmpty(headerValue) && headerValue.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                {
                    token = headerValue.Substring("Bearer ".Length).Trim();
                }
            }

            // 🔹 2️⃣ Leer Cookie (si no hay header)
            if (string.IsNullOrEmpty(token))
            {
                if (httpContext.Request.Cookies.TryGetValue(_jwtOptions.CookieName, out var cookieToken))
                {
                    token = cookieToken;
                }
            }

            // 🔴 Error: No hay token (Cortamos la petición)
            if (string.IsNullOrEmpty(token))
            {
                context.Result = new JsonResult(new { message = "Token no proporcionado" })
                {
                    StatusCode = StatusCodes.Status401Unauthorized
                };
                return;
            }

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_jwtOptions.Key);

                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = _jwtOptions.Issuer,
                    ValidateAudience = true,
                    ValidAudience = _jwtOptions.Audience,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;

                // 🔹 Leer claim del ID de usuario
                var userIdClaim = jwtToken.Claims.FirstOrDefault(c =>
                    c.Type == ClaimTypes.NameIdentifier || c.Type == "nameid" || c.Type == "sub");

                if (userIdClaim == null)
                {
                    throw new Exception("Claim userId no encontrado");
                }

                var userId = Guid.Parse(userIdClaim.Value);

                // 🔹 Buscar usuario en Base de Datos
                var user = await _db.Users
                    .Include(x => x.Role)
                    .FirstOrDefaultAsync(u => u.Id == userId);

                if (user == null)
                {
                    context.Result = new JsonResult(new { message = "Usuario no válido" })
                    {
                        StatusCode = StatusCodes.Status401Unauthorized
                    };
                    return;
                }

                // 🔥 Mapear e Insertar usuario en el Contexto
                var userMapped = _mapper.ToResponse(user);
                httpContext.Items["User"] = userMapped;

                // ✅ Todo correcto, permitimos continuar al Controlador
                await next();
            }
            catch (Exception ex)
            {
                context.Result = new JsonResult(new { message = "Token inválido", error = ex.Message })
                {
                    StatusCode = StatusCodes.Status401Unauthorized
                };
                return;
            }
        }
    }
}
