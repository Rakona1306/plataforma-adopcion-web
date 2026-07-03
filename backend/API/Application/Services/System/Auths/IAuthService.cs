using API.Application.Features.System.Auths.Dtos;

namespace API.Application.Services.System.Auths
{
    public interface IAuthService
    {
        Task<RegisterResponse> RegisterAsync(CreateAccountDto request);

        Task<AuthResponse> ConfirmEmailAsync(ConfirmEmailDto request);

        Task<AuthResponse> CompleteRegistrationAsync(CreateAccountDto request);

        Task<AuthResponse> LoginAsync(LoginAccountDto request);

        Task<UserProfileResponse> ProfileAsync(Guid userId);

        Task LogoutAsync();
    }
}
