using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Attributes;
using API.Application.Features.Bussiness.RequestAdoptions.Dtos;
using API.Application.Features.Bussiness.RequestAdoptions.Dtos.Private;
using API.Application.Helpers;
using API.Application.Services.Bussiness.RequestAdoptions;
using API.Domain.Model.Enums;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Bussiness.RequestAdoptions
{
    [ApiController]
    [Route("api/request-adoptions")]
    [AuthorizeJwt]
    public class RequestAdoptionController : ControllerBase
    {
        private readonly IRequestAdoptionService _service;

        public RequestAdoptionController(IRequestAdoptionService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRequestAdoption dto)
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

            var userId = (Guid)((dynamic)user).Id;
            await _service.Create(dto, userId);
            return Ok(new
            {
                Status = 201,
                Message = "Solicitud de adopción creada exitosamente."
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateRequestAdoption dto)
        {
            if (id != dto.Id)
                return BadRequest(new { Message = "El Id de la URL no coincide con el Id del body." });

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

            var userId = (Guid)((dynamic)user).Id;
            await _service.Update(dto, userId);
            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> Paginate([FromQuery] RequestAdoptionFilter filter)
        {
            var result = await _service.Paginate(filter);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetById(id);
            return result is null ? NotFound() : Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
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
            await _service.Delete(id, userId);
            return NoContent();
        }

        [HttpPut("{id}/review")]
        public async Task<IActionResult> Review(int id, [FromBody] ReviewRequestAdoption dto)
        {
            if (id != dto.Id)
                return BadRequest(new { Message = "El Id de la URL no coincide con el Id del body." });

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

            var reviewerId = (Guid)((dynamic)user).Id;
            var result = await _service.Review(dto, reviewerId);
            return Ok(result);
        }

        [HttpPut("{id}/comment")]
        public async Task<IActionResult> AddComment(int id, [FromBody] AddCommentRequest request)
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

            var userId = (Guid)((dynamic)user).Id;
            await _service.AddComment(id, request.Comment, userId);
            return NoContent();
        }

        [HttpGet("enums/request-adoption-status")]
        public IActionResult RequestAdoptionStatus()
        {
            return Ok(
                EnumHelper.ToList<RequestStatus>()
            );
        }

        public class AddCommentRequest
        {
            public string Comment { get; set; } = string.Empty;
        }
    }
}