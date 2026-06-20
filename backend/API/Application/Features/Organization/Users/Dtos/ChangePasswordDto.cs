namespace API.Application.Features.Organization.Users.Dtos
{
    public class ChangePasswordDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
