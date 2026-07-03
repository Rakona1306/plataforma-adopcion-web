namespace API.Infrastructure.Exceptions
{
    public class AlreadyExistException : Exception
    {
        public AlreadyExistException(string Message) : base(Message)
        {

        }
    }
}