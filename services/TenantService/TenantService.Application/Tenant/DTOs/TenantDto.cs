namespace TenantService.Application.Tenants.DTOs;

public sealed record TenantDto(
    Guid Id,
    string Name,
    string Status,
    string KeycloakOrganizationId,
    DateTime CreatedAt);