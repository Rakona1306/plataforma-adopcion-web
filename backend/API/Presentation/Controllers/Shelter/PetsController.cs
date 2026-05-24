using API.Application.Features.Shelter.Pets.Dtos;
using API.Application.Features.Shelter.Species.Dtos;
using API.Application.Services.Shelter.Pets;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.AspNetCore.RateLimiting;

namespace API.Presentation.Controllers.Shelter
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableRateLimiting("InteractionsPolicy")]
    public class PetsController : ControllerBase
    {
        private readonly IPetService _service;

        public PetsController(IPetService service)
        {
            _service = service;
        }

        [HttpGet]
        [OutputCache(Duration = 60)]
        public async Task<IActionResult> GetAll(
            [FromQuery] PetFilterDto filter
        )
        {
            return Ok(
                await _service.GetAllAsync(
                    filter
                )
            );
        }

        [HttpGet("{id}")]
        [OutputCache(Duration = 60)]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(await _service.GetByIdAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> Create(
            CreatePetDto dto
        )
        {
            return Ok(await _service.CreateAsync(dto));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            Guid id,
            UpdatePetDto dto
        )
        {
            return Ok(await _service.UpdateAsync(id, dto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.DeleteAsync(id);

            return NoContent();
        }
    }
}