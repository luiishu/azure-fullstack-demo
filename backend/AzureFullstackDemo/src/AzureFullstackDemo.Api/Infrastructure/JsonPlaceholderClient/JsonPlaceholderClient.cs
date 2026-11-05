
using System.Text.Json;

namespace AzureFullstackDemo.Api.Infrastructure.JsonPlaceholderClient;

public class JsonPlaceholderClient : IJsonPlaceholderClient
{
    private readonly HttpClient _httpClient;

    public JsonPlaceholderClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<IReadOnlyList<Todo>?> GetTodosAsync(  
        CancellationToken cancellationToken)
    {
        var todos = await _httpClient.GetFromJsonAsync<List<Todo>>("/todos", cancellationToken);
        return todos;
    }
}
