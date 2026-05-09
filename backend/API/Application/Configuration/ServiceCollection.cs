using API.Application.Services.Organization.Roles;
using API.Domain.Model;
using API.Domain.Repository.Organization;
using API.Domain.Repository.System;
using API.Infrastructure.RepositoryImpl.Organization;
using API.Infrastructure.RepositoryImpl.System;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.Design;

namespace API.Application.Configuration
{
    public static class ServiceCollection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {

            // Role
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IRolesService, RolesService>();

            services.AddScoped<IAuditLogRepository, AuditLogRepository>();

            return services;
        }
    }
}
