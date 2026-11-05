
namespace AzureFullstackDemo.Api.Features.Kpis;

public interface IKpiService
{
    public Task<GetKpisResponse?> GetKpisAsync(CancellationToken cancellationToken);

}