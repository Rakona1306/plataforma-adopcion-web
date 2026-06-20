using API.Application.Features.Organization.Roles.Dtos;
using FluentValidation;

namespace API.Application.Features.Organization.Roles.Validators
{
    public class CreateRoleValidator : AbstractValidator<CreateRoleDto>
    {
        public CreateRoleValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Nombre es requerido")
                .MinimumLength(3)
                .WithMessage("El nombre tiene 3 caracteres minimos")
                .MaximumLength(50)
                .WithMessage("El nombre tiene 50 caracteres maximos");

            RuleFor(x => x.Description)
                .MaximumLength(200)
                .WithMessage("La descripcion tiene 200 caracteres maximos");
        }
    }
}
