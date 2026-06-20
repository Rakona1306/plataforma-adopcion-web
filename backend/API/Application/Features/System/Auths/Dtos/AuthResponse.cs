namespace API.Application.Features.System.Auths.Dtos
{
    public class AuthResponse
    {
        public string Token { get; set; } =
        string.Empty;

        public UserProfileResponse User { get; set; } = new();
    }
}
