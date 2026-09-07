using TenantService.Domain.Entities;

namespace TenantService.Application.Abstractions.Persistence;

public interface ITenantRepository
{
    Task<Tenant?> GetByKeycloakOrganizationIdAsync(
        string organizationId,
        CancellationToken cancellationToken);
}