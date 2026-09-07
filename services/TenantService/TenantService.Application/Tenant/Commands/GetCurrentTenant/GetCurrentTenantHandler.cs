using TenantService.Application.Abstractions.MultiTenancy;
using TenantService.Application.Abstractions.Persistence;
using TenantService.Application.Tenants.DTOs;

namespace TenantService.Application.Tenants.Commands.GetCurrentTenant;

public sealed class GetCurrentTenantHandler
{
    private readonly ITenantContext _tenantContext;
    private readonly ITenantRepository _tenantRepository;

    public GetCurrentTenantHandler(
        ITenantContext tenantContext,
        ITenantRepository tenantRepository)
    {
        _tenantContext = tenantContext;
        _tenantRepository = tenantRepository;
    }

    public async Task<TenantDto?> Handle(
        GetCurrentTenantCommand command,
        CancellationToken cancellationToken)
    {
        if (!_tenantContext.IsAuthenticated)
        {
            return null;
        }

        var organizationId = _tenantContext.OrganizationId;

        if (string.IsNullOrWhiteSpace(organizationId))
        {
            return null;
        }

        var tenant =
            await _tenantRepository
                .GetByKeycloakOrganizationIdAsync(
                    organizationId,
                    cancellationToken);

        if (tenant is null)
        {
            return null;
        }

        return new TenantDto(
            tenant.Id,
            tenant.Name,
            tenant.IsActive ? "Active" : "Inactive",
            tenant.KeycloakOrganizationId,
            tenant.CreatedAt);
    }
}