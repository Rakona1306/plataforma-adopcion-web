using API.Application.Attributes;
using API.Application.Features.Shelter.PetVaccines.Dtos;
using API.Application.Services.Shelter.PetVaccines;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Shelter
{
    [ApiController]
    [Route("api/pet-vaccines")]
    public class PetVaccineController
    : ControllerBase
    {
        private readonly IPetVaccineService
            _service;

        public PetVaccineController(
            IPetVaccineService service
        )
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult>
            GetAll(
                [FromQuery]
            PetVaccineFilterDto filter
            )
        {
            var response =
                await _service.GetAllAsync(
                    filter
                );

            return Ok(response);
        }

        [HttpGet("{petId:guid}/{vaccineId:guid}")]
        public async Task<IActionResult>
            GetById(
                Guid petId,
                Guid vaccineId
            )
        {
            var response =
                await _service.GetByIdAsync(
                    petId,
                    vaccineId
                );

            return Ok(response);
        }

        [HttpPost]
        [AuthorizedUser]
        public async Task<IActionResult>
            Create(
                [FromBody]
            CreatePetVaccineDto dto
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

        [HttpPut("{petId:guid}/{vaccineId:guid}")]
        [AuthorizedUser]
        public async Task<IActionResult>
            Update(
                Guid petId,
                Guid vaccineId,
                [FromBody]
            UpdatePetVaccineDto dto
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
                    petId,
                    vaccineId,
                    dto,
                    userId
                );

            return Ok(response);
        }

        [HttpDelete("{petId:guid}/{vaccineId:guid}")]
        [AuthorizedUser]
        public async Task<IActionResult>
            Delete(
                Guid petId,
                Guid vaccineId
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

            await _service.DeleteAsync(
                petId,
                vaccineId,
                userId
            );

            return Ok(new
            {
                Message =
                    "Vacuna eliminada correctamente de la mascota"
            });
        }

        [HttpGet("{petId:guid}/{vaccineId:guid}/interactions")]
        [AuthorizedUser]
        public async Task<IActionResult>
            GetInteractions(
                Guid petId,
                Guid vaccineId,
                [FromQuery] int page = 1,
                [FromQuery] int pageSize = 10
            )
        {
            var response =
                await _service.GetInteractionsAsync(
                    page,
                    pageSize,
                    petId
                );

            return Ok(response);
        }
    }
}
