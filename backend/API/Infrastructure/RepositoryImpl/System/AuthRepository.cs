using API.Domain.Repository.System;
using API.Infrastructure.Db;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.RepositoryImpl.System
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ConnDbContext _context;
        public AuthRepository(ConnDbContext context)
        {
            _context = context;
        }

        public async Task<bool> ExistsByEmailAsync(string email)
        {
            email = email.Trim().ToLower();

            return await _context.Users
                .AnyAsync(
                    x => EF.Functions.ILike(
                        x.Email,
                        email
                    )
                );
        }

        public Task<bool> VerifyPassword(string password, string hashedPassword)
        {
            bool result =
            BCrypt.Net.BCrypt.Verify(
                password,
                hashedPassword
            );

            return Task.FromResult(result);
        }

        public string HashPassword(
            string password
        )
        {
            return BCrypt.Net.BCrypt.HashPassword(
                password
            );
        }
    }
}
