using API.Domain.Model.Enums;
using Microsoft.AspNetCore.Mvc;
using API.Application.Helpers;

namespace API.Presentation.Controllers.System
{
    [ApiController]
    [Route("api/enums")]
    public class EnumController: ControllerBase
    {
        [HttpGet("pet-genders")]
        public IActionResult PetGenders()
        {
            return Ok(
                EnumHelper.ToList<PetGender>()
            );
        }

        [HttpGet("pet-sizes")]
        public IActionResult PetSizes()
        {
            return Ok(
                EnumHelper.ToList<PetSize>()
            );
        }

        [HttpGet("pet-status")]
        public IActionResult PetStatus()
        {
            return Ok(
                EnumHelper.ToList<PetStatus>()
            );
        }
    }
}
