---
name: microsoft-dotnet-csharp-pro
description: Modern .NET 9 and C# 13: Clean Architecture, MediatR CQRS pattern, Entity Framework Core query optimization, Minimal APIs, and high-performance memory spans.
---

# Modern .NET 9 & C# 13 Clean Architecture

Enterprise design patterns using .NET 9 Minimal APIs, CQRS with MediatR, and EF Core 9.

## Minimal API with CQRS Pattern
```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));
var app = builder.Build();

app.MapPost("/api/v1/jobs", async (CreateJobCommand cmd, ISender sender) =>
{
    var result = await sender.Send(cmd);
    return Results.Created($"/api/v1/jobs/{result.JobId}", result);
});

public record CreateJobCommand(string DatasetName, string Query) : IRequest<JobResponse>;
public record JobResponse(Guid JobId, string Status);
```
