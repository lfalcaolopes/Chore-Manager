using Application.Validators.Chore;
using Application.DTOs.Chore;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class ApplicationDependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IValidator<ChoreCreateDto>, ChoreCreateDtoValidator>();
        services.AddScoped<IValidator<ChoreUpdateDto>, ChoreUpdateDtoValidator>();

        return services;
    }
}