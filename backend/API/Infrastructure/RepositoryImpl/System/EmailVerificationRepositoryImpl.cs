using API.Domain.Model.System;
using API.Domain.Repository.System;
using API.Infrastructure.Db;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.RepositoryImpl.System
{
    public class EmailVerificationRepositoryImpl : IEmailVerificationRepository
    {
        private readonly ConnDbContext _context;

        public EmailVerificationRepositoryImpl(ConnDbContext context)
        {
            _context = context;
        }

        public async Task<EmailVerification?> GetByEmailAsync(string email)
        {
            return await _context.EmailVerifications
                .Where(e => e.Email == email && !e.IsVerified && e.ExpiresAt > DateTime.UtcNow)
                .OrderByDescending(e => e.CreatedAt)
                .FirstOrDefaultAsync();
        }

        public async Task<EmailVerification?> GetByEmailVerifiedAsync(string email, string code)
        {
            return await _context.EmailVerifications
                .Where(e => e.Email == email && e.IsVerified && e.VerificationCode == code)
                .OrderByDescending(e => e.CreatedAt)
                .FirstOrDefaultAsync();
        }

        public async Task<EmailVerification> CreateAsync(EmailVerification verification)
        {
            verification.CreatedAt = DateTime.UtcNow;
            verification.LastUpdatedAt = DateTime.UtcNow;

            _context.EmailVerifications.Add(verification);
            await _context.SaveChangesAsync();

            return verification;
        }

        public async Task<EmailVerification?> UpdateAsync(EmailVerification verification)
        {
            verification.LastUpdatedAt = DateTime.UtcNow;

            _context.EmailVerifications.Update(verification);
            await _context.SaveChangesAsync();

            return verification;
        }

        public async Task DeleteAsync(Guid id)
        {
            var verification = await _context.EmailVerifications.FindAsync(id);
            if (verification != null)
            {
                _context.EmailVerifications.Remove(verification);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteExpiredAsync()
        {
            var expired = await _context.EmailVerifications
                .Where(e => e.ExpiresAt <= DateTime.UtcNow || (e.IsVerified && e.Attempts > 0))
                .ToListAsync();

            _context.EmailVerifications.RemoveRange(expired);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteByEmailAsync(string email)
        {
            var records = await _context.EmailVerifications
                .Where(x => x.Email == email)
                .ToListAsync();

            if (records.Any())
            {
                _context.EmailVerifications.RemoveRange(records);
                await _context.SaveChangesAsync();
            }
        }
    }
}
