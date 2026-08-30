using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Attributes;
using API.Application.Features.Bussiness.AdoptionFollowUps.Dtos;
using API.Application.Features.Bussiness.AdoptionFollowUps.Dtos.Private;
using API.Application.Services.Bussiness.AdoptionFollowUps;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Bussiness.AdoptionFollowUps
{
    [ApiController]
    [Route("api/adoption-follow-ups")]
    [AuthorizeJwt]
    public class AdoptionFollowUpController : ControllerBase
    {
        private readonly IAdoptionFollowUpService _service;

        public AdoptionFollowUpController(IAdoptionFollowUpService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] AdoptionFollowUpFilter filter)
        {
            var result = await _service.GetAllAsync(filter);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            return result is null ? NotFound() : Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateAdoptionFollowUp dto)
        {
            var user = HttpContext.Items["User"];
            if (user is null)
                return Unauthorized(new { Message = "Usuario no autorizado" });

            var userId = (Guid)((dynamic)user).Id;
            var result = await _service.CreateAsync(dto, userId);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateAdoptionFollowUp dto)
        {
            if (id != dto.Id)
                return BadRequest(new { Message = "El Id de la URL no coincide con el Id del body." });

            var user = HttpContext.Items["User"];
            if (user is null)
                return Unauthorized(new { Message = "Usuario no autorizado" });

            var userId = (Guid)((dynamic)user).Id;
            var result = await _service.UpdateAsync(dto, userId);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = HttpContext.Items["User"];
            if (user is null)
                return Unauthorized(new { Message = "Usuario no autorizado" });

            var userId = (Guid)((dynamic)user).Id;
            await _service.DeleteAsync(id, userId);
            return NoContent();
        }
    }
}