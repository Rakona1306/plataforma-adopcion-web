using API.Application.Attributes;
using API.Application.Features.Bussiness.Requests.Dtos;
using API.Application.Services.Bussiness.Requests;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Bussiness;

[ApiController]
[Route("api/[controller]")]
public class RequestsController : ControllerBase
{
    private readonly IRequestService _service;

    public RequestsController(IRequestService service)
    {
        _service = service;
    }

    // ========================================================
    // ENDPOINTS PAGINADOS POR TIPO (ENUM)
    // ========================================================

    [HttpGet("adoptions")]
    public async Task<IActionResult> GetAdoptions([FromQuery] RequestFilterDto filter)
    {
        var response = await _service.GetAdoptionsPagedAsync(filter);
        return Ok(response);
    }

    [HttpGet("donations")]
    public async Task<IActionResult> GetDonations([FromQuery] RequestFilterDto filter)
    {
        var response = await _service.GetDonationsPagedAsync(filter);
        return Ok(response);
    }

    [HttpGet("volunteerings")]
    public async Task<IActionResult> GetVolunteerings([FromQuery] RequestFilterDto filter)
    {
        var response = await _service.GetVolunteeringPagedAsync(filter);
        return Ok(response);
    }

    [HttpGet("sponsorships")]
    public async Task<IActionResult> GetSponsorships([FromQuery] RequestFilterDto filter)
    {
        var response = await _service.GetSponsorshipsPagedAsync(filter);
        return Ok(response);
    }

    // ========================================================
    // ENDPOINTS CRUD GENERALES
    // ========================================================

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var response = await _service.GetByIdAsync(id);
        return Ok(response);
    }

    [HttpPost]
    [AuthorizedUser]
    public async Task<IActionResult> Create([FromBody] CreateRequestDto dto)
    {
        var user = HttpContext.Items["User"];
        if (user is null) return Unauthorized(new { Message = "Usuario no autorizado" });

        var userId = (Guid)((dynamic)user).Id;
        var response = await _service.CreateAsync(dto, userId);
        return Ok(response);
    }

    [HttpPut("{id:guid}")]
    [AuthorizedUser]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateRequestDto dto)
    {
        var user = HttpContext.Items["User"];
        if (user is null) return Unauthorized(new { Message = "Usuario no autorizado" });

        var userId = (Guid)((dynamic)user).Id;
        var response = await _service.UpdateAsync(id, dto, userId);
        return Ok(response);
    }

    [HttpDelete("{id:guid}")]
    [AuthorizedUser]
    public async Task<IActionResult> Delete(Guid id)
    {
        var user = HttpContext.Items["User"];
        if (user is null) return Unauthorized(new { Message = "Usuario no autorizado" });

        var userId = (Guid)((dynamic)user).Id;
        await _service.DeleteAsync(id, userId);
        return Ok(new { Message = "Solicitud eliminada correctamente" });
    }

    // ========================================================
    // ENDPOINTS DE REVISIÓN (RUTAS DIFERENTES)
    // ========================================================

    [HttpPost("{id:guid}/review")]
    [AuthorizedUser] // Normalmente aquí pondrías el rol de Administrador/Mod si cuentas con ellos
    public async Task<IActionResult> CreateReview(Guid id, [FromBody] ProcessReviewDto dto)
    {
        var user = HttpContext.Items["User"];
        if (user is null) return Unauthorized(new { Message = "Usuario no autorizado" });

        var reviewerId = (Guid)((dynamic)user).Id;
        var response = await _service.CreateReviewAsync(id, dto, reviewerId);
        return Ok(response);
    }

    [HttpPut("{id:guid}/review")]
    [AuthorizedUser]
    public async Task<IActionResult> UpdateReview(Guid id, [FromBody] ProcessReviewDto dto)
    {
        var user = HttpContext.Items["User"];
        if (user is null) return Unauthorized(new { Message = "Usuario no autorizado" });

        var reviewerId = (Guid)((dynamic)user).Id;
        var response = await _service.UpdateReviewAsync(id, dto, reviewerId);
        return Ok(response);
    }

    [HttpGet("{id:guid}/interactions")]
    [AuthorizedUser]
    public async Task<IActionResult> GetInteractions(Guid id, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var response = await _service.GetInteractionsAsync(page, pageSize, id);
        return Ok(response);
    }
}