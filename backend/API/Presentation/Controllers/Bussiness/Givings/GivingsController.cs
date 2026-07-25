using API.Application.Features.Bussiness.Givings.Dtos;
using API.Application.Features.Bussiness.Givings.Dtos.Private;
using API.Application.Services.Bussiness.Givings;
using API.Domain.Common.Model;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Bussiness.Givings
{
    [ApiController]
    [Route("api/givings")]
    // [AuthorizeJwt]
    public class GivingController : ControllerBase
    {
        private readonly IGivingsService _givingsService;
        private readonly IValidator<CreateGivingDto> _createValidator;
        private readonly IValidator<UpdateGivingDto> _updateValidator;

        public GivingController(
            IGivingsService givingsService,
            IValidator<CreateGivingDto> createValidator,
            IValidator<UpdateGivingDto> updateValidator)
        {
            _givingsService = givingsService;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
        }

        /// <summary>
        /// Obtiene un listado paginado y filtrado de donaciones.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(Paginate<GivingResponse>), 200)]
        public async Task<ActionResult<Paginate<GivingResponse>>> GetPaginate([FromQuery] GivingFilterDto filter)
        {
            var result = await _givingsService.GetGivingsAsync(filter);
            return Ok(result);
        }

        /// <summary>
        /// Obtiene una donación específica por su identificador único.
        /// </summary>
        [HttpGet("{id:int}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(GivingResponse), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<GivingResponse>> GetById(int id)
        {
            try
            {
                var result = await _givingsService.GetGivingByIdAsync(id);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Crea un nuevo registro de donación.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(GivingResponse), 201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<GivingResponse>> Create([FromBody] CreateGivingDto dto)
        {
            // 1. Validar manualmente el DTO con FluentValidation
            var validationResult = await _createValidator.ValidateAsync(dto);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.ToDictionary());
            }

            // 2. Ejecutar servicio inyectando el UserId extraído del token JWT de forma segura
            var result = await _givingsService.CreateGivingAsync(dto, GetCurrentUserId());

            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        /// <summary>
        /// Actualiza una donación existente.
        /// </summary>
        [HttpPut("{id:int}")]
        [ProducesResponseType(typeof(GivingResponse), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<GivingResponse>> Update(int id, [FromBody] UpdateGivingDto dto)
        {
            var validationResult = await _updateValidator.ValidateAsync(dto);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.ToDictionary());
            }

            try
            {
                var result = await _givingsService.UpdateGivingAsync(id, dto, GetCurrentUserId());
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Elimina físicamente o lógicamente una donación del sistema.
        /// </summary>
        [HttpDelete("{id:int}")]
        [ProducesResponseType(204)] // No Content
        [ProducesResponseType(404)]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _givingsService.DeleteGivingAsync(id, GetCurrentUserId());
            if (!deleted)
            {
                return NotFound(new { message = "La donación a eliminar no existe." });
            }

            return NoContent();
        }

        /// <summary>
        /// Método auxiliar para extraer el UserId del ClaimType NameIdentifier del Token JWT.
        /// </summary>
        private Guid? GetCurrentUserId()
        {
            var user =
                HttpContext.Items["User"];

            if (user is null)
            {
                return null;
            }

            var userId =
                (Guid)((dynamic)user).Id;

            return userId;
        }
    }
}