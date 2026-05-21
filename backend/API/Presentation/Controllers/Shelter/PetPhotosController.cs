using API.Application.Attributes;
using API.Application.Features.Shelter.PetPhotos.Dtos;
using API.Application.Services.Shelter.PetPhotos;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Shelter
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetPhotosController : ControllerBase
    {
        private readonly IPetPhotoService _service;

        public PetPhotosController(
            IPetPhotoService service
        )
        {
            _service = service;
        }

        protected Guid? GetUserId()
        {
            var user = HttpContext.Items["User"];

            if (user == null)
                return null;

            var property = user
                .GetType()
                .GetProperty("Id");

            return (Guid?)property?.GetValue(user);
        }

        // =========================
        // GET ALL
        // =========================

        [HttpGet]
        [AuthorizedUser]
        public async Task<IActionResult> GetAll(
            [FromQuery] PetPhotoFilterDto filter
        )
        {
            var response =
                await _service.GetAllAsync(filter);

            return Ok(response);
        }

        // =========================
        // GET BY ID
        // =========================

        [HttpGet("{id:guid}")]
        [AuthorizedUser]
        public async Task<IActionResult> GetById(
            Guid id
        )
        {
            var response =
                await _service.GetByIdAsync(id);

            return Ok(response);
        }

        // =========================
        // CREATE
        // =========================

        [HttpPost]
        // [AuthorizedUser]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create(
            [FromForm] CreatePetPhotoDto dto
        )
        {
            var response =
                await _service.CreateAsync(
                    dto,
                    GetUserId()
                );

            return Ok(response);
        }

        // =========================
        // UPDATE
        // =========================

        [HttpPut("{id:guid}")]
        [AuthorizedUser]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update(
            Guid id,
            [FromForm] UpdatePetPhotoDto dto
        )
        {
            var response =
                await _service.UpdateAsync(
                    id,
                    dto,
                    GetUserId()
                );

            return Ok(response);
        }

        // =========================
        // DELETE
        // =========================

        [HttpDelete("{id:guid}")]
        [AuthorizedUser]
        public async Task<IActionResult> Delete(
            Guid id
        )
        {
            await _service.DeleteAsync(
                id,
                GetUserId()
            );

            return NoContent();
        }
    }
}
