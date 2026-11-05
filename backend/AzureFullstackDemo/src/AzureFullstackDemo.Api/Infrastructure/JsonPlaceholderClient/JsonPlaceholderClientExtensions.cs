
namespace AzureFullstackDemo.Api.Infrastructure.JsonPlaceholderClient;

public static class JsonPlaceHolderClientExtensions
{
    public static IServiceCollection AddJsonPlaceHolderClient(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.Configure<JsonPlaceholderClientSettings>(
            configuration.GetSection(JsonPlaceholderClientSettings.SectionName));

        services.AddHttpClient<IJsonPlaceholderClient, JsonPlaceholderClient>(client =>
        {
            client.BaseAddress = new Uri(
                configuration["External:JsonPlaceholder:BaseUrl"]!);

            client.DefaultRequestHeaders.Add("Accept", configuration["External:JsonPlaceholder:Headers:Accept"]!);
            client.DefaultRequestHeaders.Add("User-Agent", configuration["External:JsonPlaceholder:Headers:User-Agent"]!);
        });

        return services;
    }
}