using API.Application.Services.Organization.Roles;
using API.Application.Services.System.Auths;
using API.Domain.Repository.Organization;
using API.Domain.Repository.System;
using API.Infrastructure.RepositoryImpl.Organization;
using API.Infrastructure.RepositoryImpl.System;

namespace API.Application.Configuration
{
    public static class ServiceCollection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {

            // Role
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IRolesService, RolesService>();

            // User
            services.AddScoped<IUserRepository, UserRepository>();

            // Auth
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IAuthRepository, AuthRepository>();

            // ----------------------------
            services.AddScoped<IAuditLogRepository, AuditLogRepository>();

            return services;
        }
    }
}
