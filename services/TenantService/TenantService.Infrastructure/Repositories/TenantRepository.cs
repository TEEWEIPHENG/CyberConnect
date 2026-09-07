using TenantService.Domain.Entities;
using TenantService.Application.Abstractions.Persistence;

namespace TenantService.Infrastructure.Persistence.Repositories;

public class TenantRepository : ITenantRepository
{
    private readonly TenantDbContext _dbContext;

    public TenantRepository(TenantDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public Task<Tenant?> GetByKeycloakOrganizationIdAsync(
           string organizationId,
           CancellationToken cancellationToken)
    {
        return _dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(
                x => x.KeycloakOrganizationId == organizationId,
                cancellationToken);
    }
}
