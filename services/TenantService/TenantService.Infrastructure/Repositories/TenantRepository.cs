using TenantService.Domain.Entities;
using TenantService.Application.Abstractions.Persistence;
using TenantService.Infrastructure.Persistence;

namespace TenantService.Infrastructure;

public class TenantRepository : ITenantRepository
{
    private readonly TenantDbContext _context;

    public TenantRepository(TenantDbContext context)
    {
        _context = context;
    }

    
    public async Task<Tenant?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public async Task AddAsync(Tenant tenant, CancellationToken cancellationToken)
    {
        
        throw new NotImplementedException();
    }

    public async Task SaveChangesAsync(CancellationToken cancellationToken)
    {
        
        throw new NotImplementedException();
    }
}
