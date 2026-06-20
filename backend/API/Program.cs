using API.Application.Configuration;
using API.Infrastructure.Configuration;
using API.Infrastructure.Db;
using API.Infrastructure.Extensions.Jwt;
using API.Infrastructure.Middlewares;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using System.Threading.RateLimiting;

DotEnvLoader.Load(Path.Combine(Directory.GetCurrentDirectory(), ".env.example"));

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();

builder.Configuration.AddEnvironmentVariables();
builder.Services.Configure<JwtOptions>(
    builder.Configuration.GetSection("Jwt")
);

Console.WriteLine(Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection"));

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

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins(["http://localhost:3000", "https://plataforma-adopcion-web.vercel.app"])
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

builder.Services.AddAuthorization();

// Security
builder.Services.AddOutputCache();
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter(
        "InteractionsPolicy",
        config =>
        {
            config.PermitLimit = 3;

            config.Window =
                TimeSpan.FromMinutes(1);

            config.QueueProcessingOrder =
                QueueProcessingOrder.OldestFirst;

            config.QueueLimit = 0;
        });
});

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

app.UseCors("AllowFrontend");

app.UseMiddleware<ExceptionMiddleware>();

app.UseAuthentication();

app.UseAuthorization();

app.UseOutputCache();

app.UseRateLimiter();

app.MapControllers();

app.Run();
