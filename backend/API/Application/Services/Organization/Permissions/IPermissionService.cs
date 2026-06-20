using API.Application.Common.Services;
using API.Application.Features.Bussiness.Permissions.Dtos;

namespace API.Application.Services.Organization.Permissions
{
    public interface IPermissionService : IBaseService<PermissionResponse, CreatePermissionDto, UpdatePermissionDto, PermissionFilterDto>
    {
        Task<List<PermissionResponse>> GetAllSimpleAsync();
    }
}
