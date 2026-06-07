namespace API.Infrastructure.Exceptions
{
    public class NotDeleteException : Exception
    {
        public NotDeleteException(string message)
        : base(message)
        {
        }
    }
}
