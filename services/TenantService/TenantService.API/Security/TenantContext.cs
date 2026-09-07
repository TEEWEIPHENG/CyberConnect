using System.Security.Claims;
using TenantService.Application.Abstractions.MultiTenancy;

namespace TenantService.API.Security;

public sealed class TenantContext : ITenantContext
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public TenantContext(
        IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    private ClaimsPrincipal? User =>
        _httpContextAccessor.HttpContext?.User;

    public string? UserId =>
        User?.FindFirstValue(ClaimTypes.NameIdentifier)
        ?? User?.FindFirstValue("sub");

    public string? OrganizationId
    {
        get
        {
            // Adjust this according to the actual
            // organization claim produced by your Keycloak setup.

            return User?.FindFirstValue("organization_id");
        }
    }

    public bool IsAuthenticated =>
        User?.Identity?.IsAuthenticated == true;
}