using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TenantService.Application.Tenants.Commands.CreateTenant;
using TenantService.Application.Tenants.Commands.GetCurrentTenant;

namespace TenantService.API.Controllers;

[ApiController]
[Route("api/v1/tenant")]
[Authorize]

public sealed class TenantController : ControllerBase
{
    private readonly CreateTenantHandler _createTenantHandler;
    private readonly GetCurrentTenantHandler _getCurrentTenantHandler;

    [HttpGet]
    [Route("health")]
    public async Task<IActionResult> HealthCheck()
    {
        return Ok(new { status = "healthy" });
    }

    public TenantController(
        CreateTenantHandler createTenantHandler,
        GetCurrentTenantHandler getCurrentTenantHandler)
    {
        _createTenantHandler = createTenantHandler;
        _getCurrentTenantHandler = getCurrentTenantHandler;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateTenantCommand command, CancellationToken cancellationToken)
    {
        var id = await _createTenantHandler.Handle(command, cancellationToken);

        return Created($"/api/tenants/{id}", new { id });
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentTenant(
        CancellationToken cancellationToken)
    {
        var tenant = await _getCurrentTenantHandler.Handle(
            new GetCurrentTenantCommand(),
            cancellationToken);

        if (tenant is null)
        {
            return NotFound();
        }

        return Ok(tenant);
    }
}