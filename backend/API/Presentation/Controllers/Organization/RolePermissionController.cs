using API.Application.Attributes;
using API.Application.Services.Organization.RolePermissions;
using Microsoft.AspNetCore.Mvc;

namespace API.Presentation.Controllers.Organization
{
    [ApiController]
    [Route("api/role-permissions")]
    [AuthorizeJwt]
    public class RolePermissionController : ControllerBase
    {
        private readonly IRolePermissionService _service;
        public RolePermissionController(IRolePermissionService service)
        {
            _service = service;
        }

        [HttpGet("role/{roleId:guid}")]
        public async Task<IActionResult> GetPermissionsByRoleId(Guid roleId)
        {
            var response = await _service.GetPermissionsByRoleId(roleId);

            return Ok(response);
        }
    }
}