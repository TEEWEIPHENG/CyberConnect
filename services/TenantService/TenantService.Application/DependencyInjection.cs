using Microsoft.Extensions.DependencyInjection;
using TenantService.Application.Tenants.Commands.CreateTenant;
using TenantService.Application.Tenants.Commands.GetCurrentTenant;

namespace TenantService.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(
        this IServiceCollection services)
    {
        services.AddScoped<CreateTenantHandler>();
        services.AddScoped<GetCurrentTenantHandler>();
        return services;
    }
}