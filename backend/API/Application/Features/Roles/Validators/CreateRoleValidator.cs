using API.Application.Features.Roles.Dtos;
using FluentValidation;

namespace API.Application.Features.Roles.Validators
{
    public class CreateRoleValidator : AbstractValidator<CreateRoleDto>
    {
        public CreateRoleValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .MinimumLength(3)
                .MaximumLength(50);

            RuleFor(x => x.Description)
                .MaximumLength(200);
        }
    }
}
