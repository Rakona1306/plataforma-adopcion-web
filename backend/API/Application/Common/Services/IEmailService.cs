namespace API.Application.Common.Services
{
    public interface IEmailService
    {
        Task SendVerificationCodeAsync(string email, string code);
    }
}
