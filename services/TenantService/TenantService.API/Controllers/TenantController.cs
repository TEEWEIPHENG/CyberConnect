using Microsoft.AspNetCore.Mvc;
using TenantService.Application.Tenants.Commands.CreateTenant;
namespace TenantService.API.Controllers;

[ApiController]
[Route("api/tenant")]
public sealed class TenantController : ControllerBase
{
    private readonly CreateTenantHandler _handler;

    public TenantController(CreateTenantHandler handler)
    {
        _handler = handler;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateTenantCommand command, CancellationToken cancellationToken)
    {
        var id = await _handler.Handle(command, cancellationToken);

        return Created($"/api/tenants/{id}", new { id });
    }
}