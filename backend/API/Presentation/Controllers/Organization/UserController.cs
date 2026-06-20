using API.Application.Attributes;
using API.Application.Features.Organization.Users.Dtos;
using API.Application.Services.Organization.Users;
using API.Presentation.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Organization
{
    [ApiController]
    [Route("api/users")]
    [AuthorizeJwt]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _service;

        public UsersController(
            IUserService service
        )
        {
            _service = service;
        }

        protected Guid? GetUserId()
        {
            var user = HttpContext.Items["User"];

            if (user == null)
                return null;

            var property = user
                .GetType()
                .GetProperty("Id");

            return (Guid?)property?.GetValue(user);
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(
            [FromBody] ChangePasswordDto changePasswordDto
        )
        {
            await _service.ChangePassword(changePasswordDto);

            return Ok(new
            {
                message = "Contraseña cambiada correctamente"
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] UserFilterDto filter
        )
        {
            var response =
                await _service.GetAllAsync(
                    filter
                );

            return Ok(response);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(
            Guid id
        )
        {
            var response =
                await _service.GetByIdAsync(
                    id
                );

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] CreateUserDto dto
        )
        {
            var response =
                await _service.CreateAsync(
                    dto,
                    GetUser.CurrentUserId(
                        HttpContext
                    )
                );

            return Ok(response);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(
            Guid id,
            [FromBody] UpdateUserDto dto
        )
        {
            var response =
                await _service.UpdateAsync(
                    id,
                    dto,
                    GetUser.CurrentUserId(
                        HttpContext
                    )
                );

            return Ok(response);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(
            Guid id
        )
        {
            await _service.DeleteAsync(
                id,
                GetUser.CurrentUserId(
                    HttpContext
                )
            );

            return Ok(new
            {
                message =
                    "Usuario eliminado correctamente"
            });
        }

        [HttpGet("{id:guid}/interactions")]
        public async Task<IActionResult> GetInteractions(
            Guid id,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10
        )
        {
            var response =
                await _service.GetInteractionsAsync(
                    page,
                    pageSize,
                    id
                );

            return Ok(response);
        }

        [HttpPut("account/{id:guid}")]
        [AuthorizeJwt]
        public async Task<IActionResult> ChangeAccountInfo(
            Guid id,
            [FromBody] ChangeAccountInfoDto dto
        )
        {
            await _service.ChangeAccountInfo(id, dto, GetUserId());

            return NoContent();
        }
    }
}