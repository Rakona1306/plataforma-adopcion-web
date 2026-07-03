using API.Application.Attributes;
using API.Application.Features.Shelter.Pets.Dtos;
using API.Application.Services.Shelter.Pets;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;

namespace API.Presentation.Controllers.Shelter
{
    [ApiController]
    [Route("api/pets")]
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
        [AuthorizeJwt]
        public async Task<IActionResult> Create(
            CreatePetDto dto
        )
        {
            return Ok(await _service.CreateAsync(dto));
        }

        [HttpPut("{id}")]
        [AuthorizeJwt]
        public async Task<IActionResult> Update(
            Guid id,
            UpdatePetDto dto
        )
        {
            return Ok(await _service.UpdateAsync(id, dto));
        }

        [HttpDelete("{id}")]
        [AuthorizeJwt]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.DeleteAsync(id);

            return NoContent();
        }
    }
}