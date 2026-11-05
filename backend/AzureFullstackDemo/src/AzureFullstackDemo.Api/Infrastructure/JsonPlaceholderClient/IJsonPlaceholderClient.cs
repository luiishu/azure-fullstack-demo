
namespace AzureFullstackDemo.Api.Infrastructure.JsonPlaceholderClient;

public interface IJsonPlaceholderClient
{
    Task<IReadOnlyList<Todo>?> GetTodosAsync(CancellationToken cancellationToken);
}