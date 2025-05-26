using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Presentation.Utils.Exceptions;

namespace Presentation.Middlewares;

public class ApplicationProblemMiddleware : IMiddleware
{
  public async Task InvokeAsync(HttpContext context, RequestDelegate next)
  {
    try
    {
      await next(context);
    }
    catch (ApplicationProblemException ex)
    {
      context.Response.StatusCode = (int)ex.StatusCode;
      await context.Response.WriteAsJsonAsync(ex.ProblemDetails);
    }
    catch (ValidationException ex)
    {
      context.Response.StatusCode = StatusCodes.Status400BadRequest;
      var problemDetails = new ProblemDetails
      {
        Title = "Erro de validação",
        Detail = string.Join(" | ", ex.Errors.Select(e => e.ErrorMessage)),
        Status = StatusCodes.Status400BadRequest
      };
      await context.Response.WriteAsJsonAsync(problemDetails);
    }
    catch (Exception ex)
    {
      context.Response.StatusCode = StatusCodes.Status500InternalServerError;
      var problemDetails = new ProblemDetails
      {
        Title = "Erro interno do servidor",
        Detail = ex.Message,
        Status = StatusCodes.Status500InternalServerError
      };
      await context.Response.WriteAsJsonAsync(problemDetails);
    }
  }
}
