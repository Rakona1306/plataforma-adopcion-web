using API.Application.Attributes;
using API.Application.Features.Shelter.Breeds.Dtos;
using API.Application.Services.Shelter.Breeds;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Shelter.Breeds
{
    [ApiController]
    [Route("api/breeds")]
    [AuthorizeJwt]
    public class BreedController : ControllerBase
    {
        private readonly IBreedService
            _service;

        public BreedController(
            IBreedService service
        )
        {
            _service = service;
        }

        // =====================================
        // GET ALL
        // =====================================

        [HttpGet]
        public async Task<IActionResult>
            GetAll(
                [FromQuery]
            BreedFilterDto filter
            )
        {
            var response =
                await _service.GetAllAsync(
                    filter
                );

            return Ok(response);
        }

        // =====================================
        // GET BY ID
        // =====================================

        [HttpGet("{id:guid}")]
        public async Task<IActionResult>
            GetById(Guid id)
        {
            var response =
                await _service.GetByIdAsync(
                    id
                );

            return Ok(response);
        }

        // =====================================
        // CREATE
        // =====================================

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBreedDto dto)
        {
            var user =
                HttpContext.Items["User"];

            if (user is null)
            {
                return Unauthorized(
                    new
                    {
                        Message =
                            "Usuario no autorizado"
                    }
                );
            }

            var userId =
                (Guid)((dynamic)user).Id;

            var response =
                await _service.CreateAsync(
                    dto,
                    userId
                );

            return Ok(response);
        }

        // =====================================
        // UPDATE
        // =====================================

        [HttpPut("{id:guid}")]
        public async Task<IActionResult>
            Update(
                Guid id,
                [FromBody]
            UpdateBreedDto dto
            )
        {
            var user =
                HttpContext.Items["User"];

            if (user is null)
            {
                return Unauthorized(
                    new
                    {
                        Message =
                            "Usuario no autorizado"
                    }
                );
            }

            var userId =
                (Guid)((dynamic)user).Id;

            var response =
                await _service.UpdateAsync(
                    id,
                    dto,
                    userId
                );

            return Ok(response);
        }

        // =====================================
        // DELETE
        // =====================================

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult>
            Delete(Guid id)
        {
            var user =
                HttpContext.Items["User"];

            if (user is null)
            {
                return Unauthorized(
                    new
                    {
                        Message =
                            "Usuario no autorizado"
                    }
                );
            }

            var userId =
                (Guid)((dynamic)user).Id;

            await _service.DeleteAsync(
                id,
                userId
            );

            return Ok(
                new
                {
                    Message =
                        "Raza eliminada correctamente"
                }
            );
        }

        // =====================================
        // INTERACTIONS
        // =====================================

        [HttpGet("{id:guid}/interactions")]
        public async Task<IActionResult>
            GetInteractions(
                Guid id,
                [FromQuery] int page = 1,
                [FromQuery] int pageSize = 10
            )
        {
            var response =
                await _service
                    .GetInteractionsAsync(
                        page,
                        pageSize,
                        id
                    );

            return Ok(response);
        }
    }
}
