using API.Application.Attributes;
using API.Application.Features.Organization.Roles.Dtos;
using API.Application.Services.Organization.Roles;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.AspNetCore.RateLimiting;

namespace API.Presentation.Controllers.Organization
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableRateLimiting("InteractionsPolicy")]
    [AuthorizeJwt]
    public class RolesController : ControllerBase
    {
        private readonly IRolesService _service;

        public RolesController(IRolesService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRoleDto request)
        {
            var result = await _service.CreateAsync(request);
            return Ok(result);
        }
        [HttpGet]
        [OutputCache(Duration = 60)]
        public async Task<IActionResult> GetAll(
            [FromQuery] RoleFilterDto filter
            )
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
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateRoleDto
        request)
        {
            var result = await _service.UpdateAsync(id, request, null);
            return Ok(result);
        }
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.DeleteAsync(id, null);
            return NoContent();
        }
        [OutputCache(Duration = 60)]
        [HttpGet("{id:guid}/interactions")]
        public async Task<IActionResult> GetInteractions(
            Guid id,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10
            )
        {
            var result = await _service.GetInteractionsAsync(page, pageSize, id);
            return Ok(result);
        }
    }
}
