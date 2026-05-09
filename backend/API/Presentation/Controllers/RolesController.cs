using API.Application.Features.Organization.Roles.Dtos;
using API.Application.Services.Organization.Roles;
using API.Domain.Model.Organization;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController: ControllerBase
    {
        private readonly IRolesService _service;

        public RolesController(IRolesService service) { 
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRoleDto request)
        {
            var result = await _service.CreateAsync(request);
            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? search = "",
            [FromQuery] string? sort = ""
            )
        {
            var result = await _service.GetAllAsync(page, pageSize, search, sort);
            return Ok(result);
        }
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _service.GetByIdAsync(id);
            return Ok(result);
        }
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CreateRoleDto
        request)
        {
            var result = await _service.UpdateAsync(request, id, null);
            return Ok(result);
        }
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.DeleteAsync(id, null);
            return NoContent();
        }

    }
}
