using API.Application.Configuration;
using API.Infrastructure.Configuration;
using API.Infrastructure.Db;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

DotEnvLoader.Load(Path.Combine(Directory.GetCurrentDirectory(), ".env.example"));

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ConnDbContext>(options =>
    options.UseNpgsql(
        connectionString,
        o => o.CommandTimeout(60)
        ));

// Add services to the container.
builder.Services.AddApplicationServices();
builder.Services.AddValidatorsFromAssemblies(AppDomain.CurrentDomain.GetAssemblies());


builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
