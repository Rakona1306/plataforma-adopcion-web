using API.Application.Configuration;
using API.Infrastructure.Configuration;
using API.Infrastructure.Db;
using API.Infrastructure.Extensions.Features;
using API.Infrastructure.Extensions.Features.Shelter;
using API.Infrastructure.Extensions.Jwt;
using API.Infrastructure.Extensions.Ratelimit;
using API.Infrastructure.Extensions.Security;
using API.Infrastructure.Middlewares;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Resend;
using System.Threading.RateLimiting;

var envPath = Path.Combine(Directory.GetCurrentDirectory(), "production.env");

Console.WriteLine($"CurrentDirectory: {Directory.GetCurrentDirectory()}");
Console.WriteLine($"EnvPath: {envPath}");
Console.WriteLine($"Env Exists: {File.Exists(envPath)}");

DotEnvLoader.Load(envPath);

Console.WriteLine(
    Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection")
);

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();

builder.Configuration.AddEnvironmentVariables();
builder.Services.Configure<JwtOptions>(
    builder.Configuration.GetSection("Jwt")
);

builder.Services.AddAutoMapperFromApplication(
    builder.Configuration,
    typeof(Program)
);

builder.Services.AddResend(o =>
{
    o.ApiToken = Environment.GetEnvironmentVariable("RESEND_APITOKEN")!;
});

builder.Services.AddSwaggerGen();

// var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");
builder.Services.AddDbContext<ConnDbContext>(options =>
    options.UseNpgsql(
        connectionString,
        o => o.CommandTimeout(60)
        ));

// Add services to the container.
builder.Services.AddApplicationServices();
builder.Services.AddValidatorsFromAssemblies(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddControllers();
builder.Services.AddFluentValidationAutoValidation();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddAuthorization();

builder.Services.AddAppOutputCache();
builder.Services.AddAppRateLimiting();
builder.Services.AddAppCors(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}
// app.UseMiddleware<JwtUserMiddleware>();

// app.UseHttpsRedirection();

app.UseMiddleware<ExceptionMiddleware>();

app.UseSecurityHeaders();
app.UseCors(CorsExtensions.PublicApiCorsPolicy);

app.UseAppRateLimiting();
app.UseAppOutputCache();

app.UseAuthentication();

app.UseAuthorization();
app.MapControllers();

app.Run();
