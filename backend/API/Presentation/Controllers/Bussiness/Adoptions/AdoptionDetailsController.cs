using API.Application.Attributes;
using API.Application.Features.Bussiness.AdoptionDetails.Dtos;
using API.Application.Features.Bussiness.Requests.Dtos;
using API.Application.Services.Bussiness.AdoptionDetails;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Bussiness
{
    [ApiController]
    [Route("api/v1/adoptions")]
    public class AdoptionDetailsController : ControllerBase
    {
        private readonly IAdoptionDetailsPubService _service;

        public AdoptionDetailsController(IAdoptionDetailsPubService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] AdoptionDetailFilterDto filter)
        {
            var response = await _service.GetAllAsync(filter);
            return Ok(response);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var response = await _service.GetByIdAsync(id);
            return Ok(response);
        }

        [HttpPost]
        [AuthorizeJwt]
        public async Task<IActionResult> Create([FromBody] CreateReqAdoptionDetail dto)
        {
            var user = HttpContext.Items["User"];

            if (user is null)
            {
                return Unauthorized(new { Message = "Usuario no autorizado" });
            }

            var userId = (Guid)((dynamic)user).Id;

            var response = await _service.CreateAsync(dto, userId);
            return Ok(response);
        }

        [HttpPost("{id:guid}/review")]
        [AuthorizeJwt]
        public async Task<IActionResult> Review(Guid id, [FromBody] ReviewAdoptionRequest dto)
        {
            var user = HttpContext.Items["User"];

            if (user is null)
            {
                return Unauthorized(new { Message = "Usuario no autorizado" });
            }

            var reviewerId = (Guid)((dynamic)user).Id;

            var response = await _service.ReviewAsync(id, dto, reviewerId);
            return Ok(response);
        }

        [HttpPut("{id:guid}")]
        [AuthorizeJwt]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateReqAdoptionDetail dto)
        {
            var user = HttpContext.Items["User"];

            if (user is null)
            {
                return Unauthorized(new { Message = "Usuario no autorizado" });
            }

            var userId = (Guid)((dynamic)user).Id;

            var response = await _service.UpdateAsync(id, dto, userId);
            return Ok(response);
        }

        [HttpDelete("{id:guid}")]
        [AuthorizeJwt]
        public async Task<IActionResult> Delete(Guid id)
        {
            var user = HttpContext.Items["User"];

            if (user is null)
            {
                return Unauthorized(new { Message = "Usuario no autorizado" });
            }

            var userId = (Guid)((dynamic)user).Id;

            await _service.DeleteAsync(id, userId);

            return Ok(new { Message = "Solicitud de adopción y sus detalles eliminados correctamente" });
        }

        [HttpGet("{id:guid}/interactions")]
        [AuthorizeJwt]
        public async Task<IActionResult> GetInteractions(
            Guid id,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10
        )
        {
            var response = await _service.GetInteractionsAsync(page, pageSize, id);
            return Ok(response);
        }
    }
}
