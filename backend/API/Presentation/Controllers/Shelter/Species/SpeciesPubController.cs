using System;
using System.Threading.Tasks;
using API.Application.Features.Shelter.Species.Dtos.Public;
using API.Application.Services.Shelter.Species.Public;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Presentation.Controllers.Shelter.Species
{
    [ApiController]
    [Route("api/v1/species")]
    public class SpeciesPubController : ControllerBase
    {
        private readonly ISpeciePubService _service;
        private readonly ILogger<SpeciesPubController> _logger;

        public SpeciesPubController(ISpeciePubService service, ILogger<SpeciesPubController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] SpeciesPubFilterDto filter)
        {
            try
            {
                var result = await _service.GetAllAsync(filter);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener la lista pública de especies.");
                return StatusCode(500, new { message = "Ocurrió un error interno al procesar la solicitud.", error = ex.Message });
            }
        }
    }
}