namespace API.Domain.Repository.System
{
    public interface IAuthRepository
    {
        public Task<bool> ExistsByEmailAsync(string email);
        public Task<bool> VerifyPassword(string password, string hashedPassword);
        public string HashPassword(string password);

    }
}
