using API.Application.Features.System.Auths.Dtos;
using FluentValidation;

namespace API.Application.Features.System.Auths.Validators
{
    public class LoginAccountValidator
    : AbstractValidator<LoginAccountDto>
    {
        public LoginAccountValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage("El correo electrónico es requerido")
                .EmailAddress()
                .WithMessage("El formato del correo electrónico no es válido")
                .MaximumLength(120)
                .WithMessage("El correo electrónico no puede superar los 120 caracteres");

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("La contraseña es requerida")
                .MinimumLength(8)
                .WithMessage("La contraseña debe tener al menos 8 caracteres")
                .MaximumLength(100)
                .WithMessage("La contraseña no puede superar los 100 caracteres");
        }
    }
}
