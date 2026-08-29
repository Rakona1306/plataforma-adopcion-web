using API.Application.Features.Bussiness.Adoptions.Dtos;
using API.Application.Features.Bussiness.Adoptions.Dtos.Private;
using API.Application.Helpers;
using API.Application.Services.Bussiness.Adoptions;
using API.Domain.Model.Bussiness;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Bussiness.Adoptions
{
    [ApiController]
    [Route("api/adoptions")]
    public class AdoptionController : ControllerBase
    {
        private readonly IAdoptionService _service;

        public AdoptionController(IAdoptionService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Paginate([FromQuery] AdoptionFilter filter)
        {
            try
            {
                var result = await _service.PaginateAsync(filter);
                return Ok(result);
            }
            catch
            {
                return StatusCode(500, new { message = "Ocurrió un error al procesar la solicitud." });
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var result = await _service.GetByIdAsync(id);
                return Ok(result);
            }
            catch
            {
                return StatusCode(500, new { message = "Ocurrió un error al procesar la solicitud." });
            }
        }

        [HttpPut("status")]
        public async Task<IActionResult> UpdateStatus([FromBody] UpdateAdoptionStatus dto)
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

            await _service.UpdateStatusAsync(dto, userId);
            return NoContent();
        }

        [HttpGet("enums/adoption-status")]
        public IActionResult AdoptionStatus()
        {
            return Ok(
                EnumHelper.ToList<AdoptionStatus>()
            );
        }
    }
}