using API.Application.Attributes;
using API.Application.Features.Shelter.PetTraits.Dtos;
using API.Application.Services.Shelter.PetTraits;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Shelter
{
    [ApiController]
    [Route("api/pet-traits")]
    public class PetTraitController
    : ControllerBase
    {
        private readonly IPetTraitService
            _service;

        public PetTraitController(
            IPetTraitService service
        )
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult>
            GetAll(
                [FromQuery]
            PetTraitFilterDto filter
            )
        {
            var response =
                await _service.GetAllAsync(
                    filter
                );

            return Ok(response);
        }

        [HttpGet("{petId:guid}/{traitId:guid}")]
        public async Task<IActionResult>
            GetById(
                Guid petId,
                Guid traitId
            )
        {
            var response =
                await _service.GetByIdAsync(
                    petId,
                    traitId
                );

            return Ok(response);
        }

        [HttpPost]
        [AuthorizedUser]
        public async Task<IActionResult>
            Create(
                [FromBody]
            CreatePetTraitDto dto
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

        [HttpPut("{petId:guid}/{traitId:guid}")]
        [AuthorizedUser]
        public async Task<IActionResult>
            Update(
                Guid petId,
                Guid traitId,
                [FromBody]
            UpdatePetTraitDto dto
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
                    traitId,
                    dto,
                    userId
                );

            return Ok(response);
        }

        [HttpDelete("{petId:guid}/{traitId:guid}")]
        [AuthorizedUser]
        public async Task<IActionResult>
            Delete(
                Guid petId,
                Guid traitId
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
                traitId,
                userId
            );

            return Ok(new
            {
                Message =
                    "Rasgo eliminado de la mascota correctamente"
            });
        }

        [HttpGet("{petId:guid}/{traitId:guid}/interactions")]
        [AuthorizedUser]
        public async Task<IActionResult>
            GetInteractions(
                Guid petId,
                Guid traitId,
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
