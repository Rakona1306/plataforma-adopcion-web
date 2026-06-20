using API.Application.Attributes;
using API.Application.Features.Shelter.PetBreeds.Dtos;
using API.Application.Services.Shelter.PetBreedes;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Shelter
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetBreedController
    : ControllerBase
    {
        private readonly IPetBreedService
            _service;

        public PetBreedController(
            IPetBreedService service
        )
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult>
            GetAll(
                [FromQuery]
            PetBreedFilterDto filter
            )
        {
            var response =
                await _service.GetAllAsync(
                    filter
                );

            return Ok(response);
        }

        [HttpGet(
            "{petId:guid}/{breedId:guid}"
        )]
        public async Task<IActionResult>
            GetById(
                Guid petId,
                Guid breedId
            )
        {
            var response =
                await _service.GetByIdAsync(
                    petId,
                    breedId
                );

            return Ok(response);
        }

        [HttpPost]
        [AuthorizedUser]
        public async Task<IActionResult>
            Create(
                [FromBody]
            CreatePetBreedDto dto
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

        [HttpPut(
            "{petId:guid}/{breedId:guid}"
        )]
        [AuthorizedUser]
        public async Task<IActionResult>
            Update(
                Guid petId,
                Guid breedId,
                [FromBody]
            UpdatePetBreedDto dto
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
                    breedId,
                    dto,
                    userId
                );

            return Ok(response);
        }

        [HttpDelete(
            "{petId:guid}/{breedId:guid}"
        )]
        [AuthorizedUser]
        public async Task<IActionResult>
            Delete(
                Guid petId,
                Guid breedId
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
                breedId,
                userId
            );

            return Ok(new
            {
                Message =
                    "Relación mascota-raza eliminada correctamente"
            });
        }
    }
}
