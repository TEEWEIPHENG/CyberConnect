namespace TenantService.Application.Abstractions.MultiTenancy;

public interface ITenantContext
{
    string? OrganizationId { get; }

    string? UserId { get; }

    bool IsAuthenticated { get; }
}