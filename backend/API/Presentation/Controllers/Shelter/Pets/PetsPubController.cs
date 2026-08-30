using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Shelter.Pets.Dtos.Public;
using API.Application.Services.Shelter.Pets.Public;
using API.Domain.Repository.Shelter;
using API.Infrastructure.Extensions.Features.Shelter;
using API.Infrastructure.Extensions.Ratelimit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.AspNetCore.RateLimiting;

namespace API.Presentation.Controllers.Shelter.Pets
{
    [ApiController]
    [Route("api/v1/pets")]
    [EnableRateLimiting(RateLimitingExtensions.PublicApiPolicy)]
    [Produces("application/json")]
    public class PetsPubController : ControllerBase
    {
        private readonly IPetPubService _service;
        private readonly ILogger<PetsPubController> _logger;

        public PetsPubController(IPetPubService service, ILogger<PetsPubController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        [OutputCache(PolicyName = OutputCachingPetExtension.PetsListPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetPaginate([FromQuery] PetPubFilterDto filter)
        {
            var result = await _service.GetPaginate(filter);
            return Ok(result);
        }

        [HttpGet("{slug}")]
        [OutputCache(PolicyName = OutputCachingPetExtension.PetsDetailPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetBySlug(string slug)
        {
            var result = await _service.GetBySlug(slug);
            return Ok(result);
        }

        [HttpGet("recommendations")]
        [OutputCache(PolicyName = OutputCachingPetExtension.PetsRecommendationsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetRecommendations([FromQuery] PetRecommendationsFilterDto filter)
        {
            var result = await _service.GetRecommendations(filter);
            return Ok(result);
        }
    }
}