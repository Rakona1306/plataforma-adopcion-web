using API.Application.Features.Bussiness.VolunteerApplications.Dtos;
using API.Application.Features.Bussiness.VolunteerApplications.Dtos.Public;
using API.Application.Services.Bussiness.VolunteerApplications;
using API.Domain.Common.Model;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Bussiness.VolunteerApplication
{
    [Route("api/v1/volunteer-applications")]
    [ApiController]
    public class VolunteerApplicationPubController : ControllerBase
    {
        // 🔥 Inyectamos el servicio especializado con el DTO Público
        private readonly IVolunteerApplicationService<VolunteerApplicationPublicResponse> _service;

        public VolunteerApplicationPubController(
            IVolunteerApplicationService<VolunteerApplicationPublicResponse> service)
        {
            _service = service;
        }

        /// <summary>
        /// Obtiene listado público de oportunidades de voluntariado.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(Paginate<VolunteerApplicationPublicResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll([FromQuery] VolunteerApplicationFilterDto filter)
        {
            var result = await _service.GetVolunteerApplicationsAsync(filter);
            return Ok(result);
        }

        /// <summary>
        /// Obtiene detalle público de una oportunidad específica.
        /// </summary>
        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(VolunteerApplicationPublicResponse), StatusCodes.Status200OK)]
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
                return NotFound(new { message = "La oportunidad de voluntariado no fue encontrada." });
            }
        }
    }
}
