using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using TenantService.Infrastructure.Persistence;
using TenantService.Application.Abstractions.Persistence;

namespace TenantService.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<TenantDbContext>(options =>
        {
            options.UseNpgsql(
                configuration.GetConnectionString("TenantDatabase"));
        });

        services.AddScoped<ITenantRepository, TenantRepository>();

        return services;
    }
}
