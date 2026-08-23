namespace TenantService.Domain.Entities;

public sealed class Tenant
{
    public Guid Id { get; private set; }

    public string Name { get; private set; }

    public string KeycloakOrganizationId { get; private set; }

    public bool IsActive { get; private set; }

    public DateTime CreatedAt { get; private set; }

    private Tenant()
    {
    }

    public Tenant(
        Guid id,
        string name,
        string keycloakOrganizationId)
    {
        Id = id;
        Name = name;
        KeycloakOrganizationId = keycloakOrganizationId;
        IsActive = true;
        CreatedAt = DateTime.UtcNow;
    }

    public void Disable()
    {
        IsActive = false;
    }

    public void Enable()
    {
        IsActive = true;
    }
}