

using AzureFullstackDemo.Api.Features.Kpis;
using AzureFullstackDemo.Api.Infrastructure.JsonPlaceholderClient;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(jwtOptions =>
{
    jwtOptions.Authority = builder.Configuration["Entra:Authority"];
    jwtOptions.Audience = builder.Configuration["Entra:Audience"];

    jwtOptions.MapInboundClaims = false;
});

// builder.Services.AddAuthorizationBuilder();
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("RequireApiScope", policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireClaim("scp", "access_as_user");
    });

builder.Services.AddJsonPlaceHolderClient(builder.Configuration);

builder.Services.AddScoped<IKpiService, KpiService>();

builder.Services.AddValidation();
builder.Services.AddProblemDetails();

builder.Services.AddHttpLogging();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
const string allowedFrontendsPolicy = "AllowedFrontends";

var allowedFrontends = builder.Configuration
    .GetSection("Cors:AllowedFrontends")
    .Get<Dictionary<string, string>>()!
    .Values;

builder.Services.AddCors(options =>
{
    options.AddPolicy(allowedFrontendsPolicy, policy =>
    {
        policy
            .WithOrigins([.. allowedFrontends])
            .WithMethods(
                HttpMethods.Get,
                HttpMethods.Post
            )
            .WithHeaders("Content-Type", "Authorization", "X-Client");
    });
});

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();

//if (app.Environment.IsDevelopment())
if (!app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseHttpLogging();

app.UseCors(allowedFrontendsPolicy);

app.UseAuthentication();
app.UseAuthorization();

var api = app.MapGroup("api/v1");
api.MapGet("/", () => "Hello from AzureFullstackDemo.Api!");
api.MapGet("/health", () => "AzureFullstackDemo.Api is up and running! 🚀");

var kpis = api.MapGroup("/kpis").RequireAuthorization("RequireApiScope");
kpis.MapGetKpis();

// api.MapGet("/debug/claims", (HttpContext context) =>
// {
//     return context.User.Claims.Select(claim => new
//     {
//         claim.Type,
//         claim.Value
//     });
// });

Console.WriteLine($"Running AzureFullstackDemo.Api in: {app.Environment.EnvironmentName}");

app.Run();