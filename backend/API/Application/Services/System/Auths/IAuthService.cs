using API.Application.Features.System.Auths.Dtos;

namespace API.Application.Services.System.Auths
{
    public interface IAuthService
    {
        Task<AuthResponse> RegisterAsync(CreateAccountDto request);

        Task<AuthResponse> LoginAsync(LoginAccountDto request);

        Task<UserProfileResponse> ProfileAsync(Guid userId);

        Task LogoutAsync();
    }
}
