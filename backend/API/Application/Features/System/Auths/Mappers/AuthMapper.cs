using API.Application.Features.System.Auths.Dtos;
using API.Domain.Model.Organization;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.System.Auths.Mappers
{
    [Mapper]
    public partial class AuthMapper
    {
        public partial User ToEntity(CreateAccountDto dto);
        public partial UserProfileResponse ToResponse(User user);
        public partial List<UserProfileResponse> ToResponseList(List<User> auditLogs);
    }
}
