namespace API.Infrastructure.Exceptions
{
    public class NotAuthorizedException : Exception
    {
        public NotAuthorizedException(string message)
        : base(message)
        {
        }
    }
}
