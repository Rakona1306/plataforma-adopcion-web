using API.Infrastructure.Exceptions;
using System.Net;
using System.Text.Json;

namespace API.Infrastructure.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(
            RequestDelegate next
        )
        {
            _next = next;
        }

        public async Task InvokeAsync(
            HttpContext context
        )
        {
            try
            {
                await _next(context);
            }
            catch (NotAuthorizedException ex)
            {
                Console.WriteLine(ex);
                await HandleExceptionAsync(
                    context,
                    HttpStatusCode.Unauthorized,
                    ex.Message
                );
            }
            catch (BadRequestException ex)
            {
                Console.WriteLine(ex);
                await HandleExceptionAsync(
                    context,
                    HttpStatusCode.BadRequest,
                    ex.Message
                );
            }
            catch (NotFoundException ex)
            {
                Console.WriteLine(ex);
                await HandleExceptionAsync(
                    context,
                    HttpStatusCode.NotFound,
                    ex.Message
                );
            }
            catch (AlreadyExistException ex)
            {
                await HandleExceptionAsync(
                    context,
                    HttpStatusCode.BadRequest,
                    ex.Message
                );
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                await HandleExceptionAsync(
                    context,
                    HttpStatusCode.InternalServerError,
                    e.Message ?? "Error interno del servidor."
                );
            }
        }

        private static async Task HandleExceptionAsync(
            HttpContext context,
            HttpStatusCode statusCode,
            string message
        )
        {
            context.Response.ContentType =
                "application/json";

            context.Response.StatusCode =
                (int)statusCode;

            var response = new
            {
                message
            };

            await context.Response.WriteAsync(
                JsonSerializer.Serialize(response)
            );
        }
    }
}
