using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace AzureFullstackDemo.Api.Features.Kpis;

public static class GetKpis
{
    public static RouteGroupBuilder MapGetKpis(this RouteGroupBuilder group)
    {
        group.MapGet("/", GetKpisAsync).WithTags(nameof(GetKpisAsync));
        return group;
    }

    private static async Task<Results<Ok<GetKpisResponse>, InternalServerError, BadRequest<string>>> GetKpisAsync(
        [FromServices] IKpiService service,
        CancellationToken cancellationToken
    )
    {
        try
        {
            var kpis = await service.GetKpisAsync(cancellationToken);
            return TypedResults.Ok(kpis);
        }
        catch (ArgumentException ex)
        {
            return TypedResults.BadRequest(ex.Message);
        }
    }
}

