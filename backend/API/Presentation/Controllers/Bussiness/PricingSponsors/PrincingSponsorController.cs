using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Bussiness.PricingSponsors.Dtos;
using API.Application.Services.Bussiness.PricingSponsors;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Bussiness.PricingSponsors
{
    [ApiController]
    [Route("api/pricing-sponsors")]
    public class PricingSponsorController : ControllerBase
    {
        private readonly IPricingSponsorService _service;

        public PricingSponsorController(IPricingSponsorService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Paginate([FromQuery] PricingSponsorFilter filter)
        {
            var result = await _service.Paginate(filter);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePricingSponsor dto)
        {
            Guid? userId = GetUserId();
            await _service.Create(dto, userId);
            return CreatedAtAction(nameof(Paginate), null);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdatePricingSponsor dto)
        {
            if (id != dto.Id)
            {
                return BadRequest(new { Message = "El Id de la URL no coincide con el Id del body." });
            }

            Guid? userId = GetUserId();
            await _service.Update(dto, userId);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Guid? userId = GetUserId();
            await _service.Delete(id, userId);
            return NoContent();
        }

        private Guid? GetUserId()
        {
            var userIdClaim = User.FindFirst("sub")?.Value;
            return string.IsNullOrEmpty(userIdClaim) ? null : Guid.Parse(userIdClaim);
        }


    }
}