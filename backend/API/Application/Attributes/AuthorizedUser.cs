using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Application.Attributes
{
    public class AuthorizedUser : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(
        AuthorizationFilterContext context)
        {
            var user =
                context.HttpContext.Items["User"];

            if (user == null)
            {
                context.Result =
                    new UnauthorizedResult();
            }
        }
    }
}
