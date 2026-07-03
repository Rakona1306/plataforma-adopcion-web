using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Shelter.Breeds.Dtos;
using API.Application.Features.Shelter.Breeds.Dtos.Public;
using API.Application.Services.Shelter.Breeds;
using API.Application.Services.Shelter.Breeds.Public;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Shelter.Breeds
{
    [ApiController]
    [Route("api/v1/breeds")]
    public class BreedsPubController : ControllerBase
    {
        private readonly IBreedPubService _service;

        public BreedsPubController(IBreedPubService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] BreedPubFilterDto filter)
        {
            var response = await _service.GetAll(filter);

            return Ok(response);
        }
    }
}