using API.Application.Attributes;
using API.Application.Features.Shelter.Species.Dtos;
using API.Application.Services.Shelter.Species;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Shelter.Specie
{
    [ApiController]
    [Route("api/[controller]")]
    [AuthorizeJwt]
    // [EnableRateLimiting("InteractionsPolicy")]
    public class SpeciesController : ControllerBase
    {
        private readonly ISpeciesService _service;

        public SpeciesController(
            ISpeciesService service
        )
        {
            _service = service;
        }

        protected Guid? GetUserId()
        {
            var user = HttpContext.Items["User"];

            if (user == null)
                return null;

            var property = user.GetType()
                .GetProperty("Id");

            return (Guid?)property?.GetValue(user);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] SpeciesFilterDto filter
        )
        {
            return Ok(
                await _service.GetAllAsync(filter)
            );
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(
                await _service.GetByIdAsync(id)
            );
        }

        [HttpPost]
        public async Task<IActionResult> Create(
            CreateSpeciesDto dto
        )
        {
            return Ok(
                await _service.CreateAsync(
                    dto,
                    GetUserId()
                )
            );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            Guid id,
            UpdateSpeciesDto dto
        )
        {
            return Ok(
                await _service.UpdateAsync(
                    id,
                    dto,
                    GetUserId()
                )
            );
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.DeleteAsync(
                id,
                GetUserId()
            );

            return NoContent();
        }
    }
}
