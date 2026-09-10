using API.Application.Attributes;
using API.Application.Features.Bussiness.VolunteerApplications.Dtos;
using API.Application.Features.Bussiness.VolunteerApplications.Dtos.Private;
using API.Application.Services.Bussiness.VolunteerApplications;
using API.Domain.Common.Model;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Bussiness.VolunteerApplication
{
    [ApiController]
    [Route("api/volunteer-applications")]
    [AuthorizeJwt]
    public class VolunteerApplicationController : ControllerBase
    {
        private readonly IVolunteerApplicationService<VolunteerApplicationResponse> _service;
        private readonly IValidator<CreateVolunteerApplication> _createValidator;
        private readonly IValidator<UpdateVolunteerApplication> _updateValidator;

        // Inyectamos el servicio especializado para la respuesta por defecto
        public VolunteerApplicationController(
            IVolunteerApplicationService<VolunteerApplicationResponse> service,
            IValidator<CreateVolunteerApplication> createValidator,
            IValidator<UpdateVolunteerApplication> updateValidator)
        {
            _service = service;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
        }

        /// <summary>
        /// Obtiene una lista paginada de solicitudes de voluntariado.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(Paginate<VolunteerApplicationResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll([FromQuery] VolunteerApplicationFilterDto filter)
        {
            try
            {
                // Al usar el servicio inyectado con <VolunteerApplicationResponse>, 
                // ya estamos optimizando la consulta SQL para traer solo esos campos.
                var result = await _service.GetVolunteerApplicationsAsync(filter);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno al obtener las solicitudes.", error = ex.Message });
            }
        }

        /// <summary>
        /// Obtiene una solicitud de voluntariado específica por su ID.
        /// </summary>
        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(VolunteerApplicationResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var result = await _service.GetVolunteerApplicationByIdAsync(id);
                return Ok(result);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = $"La solicitud con ID {id} no fue encontrada." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno al obtener la solicitud.", error = ex.Message });
            }
        }

        /// <summary>
        /// Crea una nueva solicitud de voluntariado.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(VolunteerApplicationResponse), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateVolunteerApplication dto)
        {
            // 1. Validación con FluentValidation
            var validationResult = await _createValidator.ValidateAsync(dto);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }

            try
            {
                // Obtenemos el ID del usuario desde el ClaimsPrincipal (asumiendo que AuthorizeJwt lo pobla)
                var userId = User.FindFirst("sub")?.Value != null
                    ? Guid.Parse(User.FindFirst("sub")!.Value)
                    : (Guid?)null;

                var result = await _service.CreateVolunteerApplicationAsync(dto, userId);
                return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno al crear la solicitud.", error = ex.Message });
            }
        }

        /// <summary>
        /// Actualiza una solicitud de voluntariado existente.
        /// </summary>
        [HttpPut("{id:int}")]
        [ProducesResponseType(typeof(VolunteerApplicationResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateVolunteerApplication dto)
        {
            // 1. Validación con FluentValidation
            var validationResult = await _updateValidator.ValidateAsync(dto);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }

            try
            {
                var userId = User.FindFirst("sub")?.Value != null
                    ? Guid.Parse(User.FindFirst("sub")!.Value)
                    : (Guid?)null;

                var result = await _service.UpdateVolunteerApplicationAsync(id, dto, userId);
                return Ok(result);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = $"La solicitud con ID {id} no fue encontrada para actualizar." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno al actualizar la solicitud.", error = ex.Message });
            }
        }

        /// <summary>
        /// Elimina una solicitud de voluntariado.
        /// </summary>
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var userId = User.FindFirst("sub")?.Value != null
                    ? Guid.Parse(User.FindFirst("sub")!.Value)
                    : (Guid?)null;

                var result = await _service.DeleteVolunteerApplicationAsync(id, userId);

                if (!result)
                    return NotFound(new { message = $"La solicitud con ID {id} no fue encontrada o ya fue eliminada." });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno al eliminar la solicitud.", error = ex.Message });
            }
        }
    }
}


