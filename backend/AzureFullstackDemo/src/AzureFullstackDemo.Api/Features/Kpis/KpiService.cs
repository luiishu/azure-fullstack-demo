
using AzureFullstackDemo.Api.Infrastructure.JsonPlaceholderClient;

namespace AzureFullstackDemo.Api.Features.Kpis;

public class KpiService(IJsonPlaceholderClient jsonPlaceholderClient) : IKpiService
{

    public async Task<GetKpisResponse?> GetKpisAsync(
        CancellationToken cancellationToken)
    {
        var todos = await jsonPlaceholderClient.GetTodosAsync(cancellationToken);
        Console.WriteLine(todos);

        

        var response = new GetKpisResponse(
            TodosCount: todos!.Count,
            CompletedTodosCount: todos!.Count(todo => todo.Completed == false),
            IncompletedTodosCount: todos!.Count(todo => todo.Completed == true)
        );

        return response;
    }
}