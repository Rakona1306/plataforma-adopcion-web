using API.Application.Attributes;
using API.Application.Features.System.Auths.Dtos;
using API.Application.Services.System.Auths;
using API.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.System
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;

        public AuthController(
            IAuthService service
        )
        {
            _service = service;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(
            [FromBody] CreateAccountDto request
        )
        {
            try
            {
                var result =
                await _service.RegisterAsync(
                    request
                );

                return Ok(result);
            }
            catch (BadRequestException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, new
                {
                    message = "Error interno del servidor."
                });
            }
        }

        [HttpPost("verify-email")]
        public async Task<IActionResult> VerifyEmail(
            [FromBody] ConfirmEmailDto request
        )
        {
            try
            {
                var result = await _service.ConfirmEmailAsync(request);

                return Ok(new
                {
                    message = "Email verificado exitosamente.",
                    email = request.Email
                });
            }
            catch (BadRequestException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, new
                {
                    message = "Error interno del servidor."
                });
            }
        }

        [HttpPost("complete-registration")]
        public async Task<IActionResult> CompleteRegistration(
            [FromBody] CreateAccountDto request
        )
        {
            try
            {
                var result = await _service.CompleteRegistrationAsync(request);

                SetAuthCookie(result.Token);

                return Ok(result);
            }
            catch (BadRequestException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, new
                {
                    message = "Error interno del servidor."
                });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(
            [FromBody] LoginAccountDto request
        )
        {
            try
            {
                var result = await _service.LoginAsync(
                    request
                );

                SetAuthCookie(result.Token);

                return Ok(result);
            }
            catch (NotAuthorizedException ex)
            {
                return Unauthorized(new
                {
                    message = ex.Message
                });
            }
            catch (BadRequestException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, new
                {
                    message = "Error interno del servidor."
                });
            }
        }

        [HttpGet("profile")]
        [AuthorizeJwt]
        public IActionResult Profile()
        {
            var user = HttpContext.Items["User"];

            if (user == null)
            {
                return Unauthorized();
            }

            return Ok(user);
        }

        [HttpPost("logout")]
        [AuthorizeJwt]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("access_token");

            return Ok(new
            {
                message = "Logout success"
            });
        }

        private void SetAuthCookie(
            string token
        )
        {
            if (string.IsNullOrEmpty(token))
                return;

            Response.Cookies.Append(
                "access_token",
                token,
                new CookieOptions
                {
                    HttpOnly = true,

                    Secure = true,

                    SameSite =
                        SameSiteMode.None,

                    Expires =
                        DateTime.UtcNow
                            .AddDays(7)
                }
            );
        }
    }
}

