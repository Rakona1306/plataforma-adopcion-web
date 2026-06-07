using API.Application.Features.Bussiness.Permissions.Dtos;
using API.Domain.Model.Organization;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Organization.Permissions.Mappers
{
    [Mapper]
    public partial class PermissionMapper
    {
        public partial Permission ToEntity(CreatePermissionDto request);
        public partial PermissionResponse ToResponse(Permission permission);
        public partial List<PermissionResponse> ToResponseList(List<Permission> permissions);
        public partial void Update(UpdatePermissionDto source, [MappingTarget] Permission target);
    }
}
