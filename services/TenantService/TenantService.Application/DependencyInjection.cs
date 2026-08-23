using Microsoft.Extensions.DependencyInjection;
using TenantService.Application.Tenants.Commands.CreateTenant;

namespace TenantService.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(
        this IServiceCollection services)
    {
        services.AddScoped<CreateTenantHandler>();

        return services;
    }
}