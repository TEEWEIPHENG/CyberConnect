using CyberConnect.ApiGateway.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddCyberConnectAuthentication(builder.Configuration)
    .AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/health/live", () => Results.Ok(new
{
    status = "ok"
})).AllowAnonymous();

app.MapReverseProxy()
    .RequireAuthorization("AuthenticatedUser");

app.Run();