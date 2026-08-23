public interface IKeycloakOrganizationService
{
    Task<string> CreateOrganizationAsync(string name, CancellationToken cancellationToken);
}