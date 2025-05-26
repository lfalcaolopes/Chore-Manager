using Application.Validators.Chores;
using Application.DTOs.Chores;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using Application.Services.Chores;
using System.Reflection;
using FluentValidation.AspNetCore;

namespace Application;

public static class ApplicationDependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        services.AddScoped<IValidator<ChoreCreateDto>, ChoreCreateDtoValidator>();
        services.AddScoped<IValidator<ChoreUpdateDto>, ChoreUpdateDtoValidator>();

        services.AddScoped<IChoreService, ChoreService>();

        return services;
    }
}