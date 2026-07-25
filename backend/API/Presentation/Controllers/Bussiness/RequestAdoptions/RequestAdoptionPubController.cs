using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Attributes;
using API.Application.Features.Bussiness.RequestAdoptions.Dtos.Public;
using API.Application.Services.Bussiness.RequestAdoptions;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Bussiness.RequestAdoptions
{
    [ApiController]
    [Route("api/v1/request-adoptions")]
    [AuthorizeJwt]
    public class RequestAdoptionPublicController : ControllerBase
    {
        private readonly IRequestAdoptionPubService _service;


        public RequestAdoptionPublicController(IRequestAdoptionPubService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePubRequestAdoption dto)
        {
            try
            {
                var user = HttpContext.Items["User"];

                if (user is null)
                {
                    return Unauthorized(
                        new
                        {
                            Message =
                                "Usuario no autorizado"
                        }
                    );
                }

                var userId = (Guid)((dynamic)user).Id;

                await _service.Create(dto, userId);
                return Ok(new
                {
                    Status = 201,
                    Message = "Solicitud de adopción creada exitosamente."
                });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message, type = "INVALID_OPERATION" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ocurrió un error al procesar la solicitud.", error = ex.Message });
            }
        }
    }
}