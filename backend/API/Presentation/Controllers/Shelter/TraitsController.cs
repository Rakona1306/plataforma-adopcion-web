using API.Application.Attributes;
using API.Application.Features.Shelter.Traits.Dtos;
using API.Application.Services.Shelter.Traits;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Shelter
{
    [ApiController]
    [Route("api/[controller]")]
    public class TraitsController : ControllerBase
    {
        private readonly ITraitService
            _service;

        public TraitsController(
            ITraitService service
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
            TraitFilterDto filter
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
        [AuthorizedUser]
        public async Task<IActionResult>
            Create(
                [FromBody]
            CreateTraitDto dto
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
        [AuthorizedUser]
        public async Task<IActionResult>
            Update(
                Guid id,
                [FromBody]
            UpdateTraitDto dto
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
        [AuthorizedUser]
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
                        "Característica eliminada correctamente"
                }
            );
        }

        // =====================================
        // INTERACTIONS
        // =====================================

        [HttpGet("{id:guid}/interactions")]
        [AuthorizedUser]
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
