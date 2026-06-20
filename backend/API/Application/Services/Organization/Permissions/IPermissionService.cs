using API.Application.Common.Services;
using API.Application.Features.Bussiness.Permissions.Dtos;

namespace API.Application.Services.Organization.Permissions
{
    public interface IPermissionService : IBaseService<PermissionResponse, CreatePermissionDto, UpdatePermissionDto, PermissionFilterDto, PermissionResponse>
    {
        Task<List<PermissionResponse>> GetAllSimpleAsync();
    }
}
