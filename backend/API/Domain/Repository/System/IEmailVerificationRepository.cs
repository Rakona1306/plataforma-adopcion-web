using API.Domain.Model.System;

namespace API.Domain.Repository.System
{
    public interface IEmailVerificationRepository
    {
        Task<EmailVerification?> GetByEmailAsync(string email);
        Task<EmailVerification?> GetByEmailVerifiedAsync(string email, string code);
        Task<EmailVerification> CreateAsync(EmailVerification verification);
        Task<EmailVerification?> UpdateAsync(EmailVerification verification);
        Task DeleteAsync(Guid id);
        Task DeleteExpiredAsync();
        Task DeleteByEmailAsync(string email);
    }
}
