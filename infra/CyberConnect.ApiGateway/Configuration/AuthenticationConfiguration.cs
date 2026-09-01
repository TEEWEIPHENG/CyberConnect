namespace CyberConnect.ApiGateway.Configuration;

public sealed class AuthenticationConfiguration
{
    public const string SectionName = "Keycloak";

    public string Authority { get; set; } = "https://auth.cyberconnect.local/realms/cyberconnect";
    public string Audience { get; set; } = "cyberconnect-api";
    public bool RequireHttpsMetadata { get; set; } = true;
    public bool ValidateIssuer { get; set; } = true;
    public bool ValidateAudience { get; set; } = true;
}
