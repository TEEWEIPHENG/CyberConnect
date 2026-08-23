using TenantService.Application.Abstractions.Persistence;

namespace TenantService.Application.Tenants.Commands.CreateTenant;

public sealed class CreateTenantHandler
{
    private readonly ITenantRepository _repository;

    public CreateTenantHandler(ITenantRepository repository)
    {
        _repository = repository;
    }

    public async Task<Guid> Handle(CreateTenantCommand command,CancellationToken cancellationToken)
    {
        // Business logic here

        throw new NotImplementedException();
    }
}