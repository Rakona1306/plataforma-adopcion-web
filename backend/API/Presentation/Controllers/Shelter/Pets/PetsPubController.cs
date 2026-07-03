using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Shelter.Pets.Dtos.Public;
using API.Application.Services.Shelter.Pets.Public;
using API.Domain.Repository.Shelter;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Shelter.Pets
{
    [ApiController]
    [Route("api/v1/pets")]
    public class PetsPubController : ControllerBase
    {
        private readonly IPetPubService _service;
        public PetsPubController(IPetPubService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetPaginate([FromQuery] PetPubFilterDto filter)
        {
            var result = await _service.GetPaginate(filter);
            return Ok(result);
        }

        [HttpGet("{slug}")]
        public async Task<IActionResult> GetBySlug(string slug)
        {
            var result = await _service.GetBySlug(slug);
            return Ok(result);
        }

        [HttpGet("recommendations")]
        public async Task<IActionResult> GetRecommendations([FromQuery] PetRecommendationsFilterDto filter)
        {
            var result = await _service.GetRecommendations(filter);
            return Ok(result);
        }
    }
}