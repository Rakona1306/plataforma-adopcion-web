using API.Domain.Common.Model;

namespace API.Domain.Model.System
{
    public class EmailVerification : BaseModel
    {
        public string Email { get; set; } = string.Empty;
        public string VerificationCode { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; }
        public bool IsVerified { get; set; } = false;
        public int Attempts { get; set; } = 0;
    }
}
