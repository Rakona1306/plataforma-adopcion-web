using API.Application.Features.Organization.Users.Dtos;
using FluentValidation;

namespace API.Application.Features.Organization.Users.Validations
{
    public class CreateUserValidator : AbstractValidator<CreateUserDto>
    {
        public CreateUserValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.LastName)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.Email)
                .EmailAddress();

            RuleFor(x => x.Password)
                .MinimumLength(8);

            RuleFor(x => x.RoleId)
                .NotEmpty();
        }
    }
}
