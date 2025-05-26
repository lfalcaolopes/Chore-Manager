using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Utils.Exceptions;

public class ApplicationProblemException : Exception
{
  public ApplicationProblemException(HttpStatusCode statusCode, ProblemDetails problemDetails)
  {
    StatusCode = statusCode;
    ProblemDetails = problemDetails;
  }
  public HttpStatusCode StatusCode { get; set; }

  public ProblemDetails ProblemDetails { get; set; }
}
