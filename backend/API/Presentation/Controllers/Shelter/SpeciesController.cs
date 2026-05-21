using API.Application.Attributes;
using API.Application.Features.Shelter.Species.Dtos;
using API.Application.Services.Shelter.Species;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.AspNetCore.RateLimiting;

namespace API.Presentation.Controllers.Shelter
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableRateLimiting("InteractionsPolicy")]
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
        [OutputCache(Duration = 60)]
        public async Task<IActionResult> GetAll(
            [FromQuery] SpeciesFilterDto filter
        )
        {
            return Ok(
                await _service.GetAllAsync(filter)
            );
        }

        [HttpGet("{id}")]
        [OutputCache(Duration = 60)]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(
                await _service.GetByIdAsync(id)
            );
        }

        [HttpPost]
        [AuthorizedUser]
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
        [AuthorizedUser]
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
        [AuthorizedUser]
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
