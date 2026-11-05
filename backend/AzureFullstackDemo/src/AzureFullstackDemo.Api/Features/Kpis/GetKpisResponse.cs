namespace AzureFullstackDemo.Api.Features.Kpis;

public record GetKpisResponse(
    int TodosCount,
    int CompletedTodosCount,
    int IncompletedTodosCount
);