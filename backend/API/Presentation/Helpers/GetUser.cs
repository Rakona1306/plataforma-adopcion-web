using API.Domain.Model.Organization;

namespace API.Presentation.Helpers
{
    public static class GetUser
    {
        public static User? Current(
            HttpContext context
        )
        {
            return context.Items["User"]
                as User;
        }

        public static Guid? CurrentUserId(
            HttpContext context
        )
        {
            var user =
                context.Items["User"]
                    as User;

            return user?.Id;
        }
    }
}