using API.Application.Common.Services;
using API.Application.Features.Organization.Users.Dtos;

namespace API.Application.Services.Organization.Users
{
    public interface IUserService
    : IBaseService<
        UserResponse,
        CreateUserDto,
        UpdateUserDto,
        UserFilterDto,
        UserResponse>
    {
        Task ChangePassword(ChangePasswordDto changePasswordDto);

        Task ChangeAccountInfo(Guid id, ChangeAccountInfoDto dto, Guid? userId);
    }
}
