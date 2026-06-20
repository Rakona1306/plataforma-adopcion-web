using API.Application.Features.Bussiness.Permissions.Dtos;
using FluentValidation;

namespace API.Application.Features.Organization.Permissions.Validators
{
    public class PermissionValidator : AbstractValidator<CreatePermissionDto>
    {
        public PermissionValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MinimumLength(3);
            RuleFor(x => x.Module).NotEmpty().MaximumLength(50);
        }
    }
}
