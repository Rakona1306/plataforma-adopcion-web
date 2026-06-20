using System.Security.Claims;
using API.Application.Attributes;
using API.Application.Features.Bussiness.Donations.Dtos;
using API.Application.Services.Bussiness.Donations;
using API.Domain.Model.Enums;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Bussiness;

[ApiController]
[Route("api/[controller]")]
public class DonationsController : ControllerBase
{
    private readonly IDonationService _service;

    public DonationsController(IDonationService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] DonationFilterDto filter)
    {
        var response = await _service.GetAllAsync(filter);
        return Ok(response);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var response = await _service.GetByIdAsync(id);
        return Ok(response);
    }

    [HttpPost]
    [AuthorizedUser]
    public async Task<IActionResult> Create([FromBody] CreateDonationDto dto)
    {
        var user = HttpContext.Items["User"];

        if (user is null)
        {
            return Unauthorized(new { Message = "Usuario no autorizado" });
        }

        var userId = (Guid)((dynamic)user).Id;

        var response = await _service.CreateAsync(dto, userId);
        return Ok(response);
    }

    [HttpPut("{id:guid}")]
    [AuthorizedUser]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateDonationDto dto)
    {
        var user = HttpContext.Items["User"];

        if (user is null)
        {
            return Unauthorized(new { Message = "Usuario no autorizado" });
        }

        var userId = (Guid)((dynamic)user).Id;

        var response = await _service.UpdateAsync(id, dto, userId);
        return Ok(response);
    }

    [HttpPatch("{id:guid}/status")]
    [AuthorizedUser]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] DonationStatus status)
    {
        var user = HttpContext.Items["User"];

        if (user is null)
        {
            return Unauthorized(new { Message = "Usuario no autorizado" });
        }

        var userId = (Guid)((dynamic)user).Id;

        var response = await _service.UpdateStatusAsync(id, status, userId);
        return Ok(response);
    }

    [HttpDelete("{id:guid}")]
    [AuthorizedUser]
    public async Task<IActionResult> Delete(Guid id)
    {
        var user = HttpContext.Items["User"];

        if (user is null)
        {
            return Unauthorized(new { Message = "Usuario no autorizado" });
        }

        var userId = (Guid)((dynamic)user).Id;

        await _service.DeleteAsync(id, userId);

        return Ok(new { Message = "Donación eliminada correctamente" });
    }

    [HttpGet("{id:guid}/interactions")]
    [AuthorizedUser]
    public async Task<IActionResult> GetInteractions(
        Guid id,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10
    )
    {
        var response = await _service.GetInteractionsAsync(page, pageSize, id);
        return Ok(response);
    }
}