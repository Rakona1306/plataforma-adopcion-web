using API.Application.Attributes;
using API.Application.Features.Bussiness.Permissions.Dtos;
using API.Application.Services.Organization.Permissions;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Organization
{
    [ApiController]
    [Route("api/permissions")]
    [AuthorizeJwt]
    public class PermissionController : ControllerBase
    {
        private readonly IPermissionService _service;

        public PermissionController(IPermissionService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] PermissionFilterDto filter)
        {
            var result = await _service.GetAllAsync(filter);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _service.GetByIdAsync(id);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePermissionDto request)
        {
            var result = await _service.CreateAsync(request);
            return Ok(result);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdatePermissionDto request)
        {
            var result = await _service.UpdateAsync(id, request);
            return Ok(result);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            // El ExceptionMiddleware capturará cualquier error (ej. NotFoundException)
            await _service.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("{id:guid}/interactions")]
        public async Task<IActionResult> GetInteractions(
            Guid id,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var result = await _service.GetInteractionsAsync(page, pageSize, id);
            return Ok(result);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllSimple()
        {
            var result = await _service.GetAllSimpleAsync();
            return Ok(result);
        }
    }
}
