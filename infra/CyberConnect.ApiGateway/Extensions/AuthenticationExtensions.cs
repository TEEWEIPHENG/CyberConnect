using CyberConnect.ApiGateway.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace CyberConnect.ApiGateway.Extensions;

public static class AuthenticationExtensions
{
    public static IServiceCollection AddCyberConnectAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var keycloakSettings = configuration
            .GetSection(AuthenticationConfiguration.SectionName)
            .Get<AuthenticationConfiguration>() ?? new AuthenticationConfiguration();

        var authority = keycloakSettings.Authority;
        var audience = keycloakSettings.Audience;
        Console.WriteLine($"Keycloak Authority: {authority}");
        Console.WriteLine($"Keycloak Audience: {audience}");
        services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.Authority = authority;
                options.Audience = audience;
                options.RequireHttpsMetadata = keycloakSettings.RequireHttpsMetadata;
                options.IncludeErrorDetails = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = keycloakSettings.ValidateIssuer,
                    ValidateAudience = keycloakSettings.ValidateAudience,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromMinutes(1),
                    NameClaimType = "preferred_username",
                    RoleClaimType = "role"
                };

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        Console.WriteLine(
                            $"JWT FAILED: {context.Exception}");

                        return Task.CompletedTask;
                    },


                    OnTokenValidated = context =>
                    {
                        Console.WriteLine("JWT VALIDATED");

                        var identity = context.Principal?.Identity;
                        if (identity is null || !identity.IsAuthenticated)
                        {
                            context.Fail("Token validation failed.");
                        }

                        return Task.CompletedTask;
                    }
                };
            });

        services.AddAuthorization(options =>
        {
            options.AddPolicy("AuthenticatedUser", policy =>
                policy.RequireAuthenticatedUser());
        });

        return services;
    }
}
