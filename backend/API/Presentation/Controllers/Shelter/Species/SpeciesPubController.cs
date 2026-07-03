using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Services.Shelter.Species.Public;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Shelter.Specie
{
    [ApiController]
    [Route("api/v1/species")]
    public class SpeciesPubController : ControllerBase
    {
        private readonly ISpeciePubService _service;
        public SpeciesPubController(ISpeciePubService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var species = await _service.GetAll();

            return Ok(species);
        }
    }
}