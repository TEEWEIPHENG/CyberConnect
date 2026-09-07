using TenantService.Application;
using TenantService.Infrastructure;
using TenantService.API.Security;
using TenantService.Application.Abstractions.MultiTenancy;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplication();

builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddControllers();

builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<ITenantContext, TenantContext>();

var app = builder.Build();

app.MapControllers();

app.Run();