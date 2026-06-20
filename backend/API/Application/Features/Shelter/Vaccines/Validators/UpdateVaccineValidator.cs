using API.Application.Features.Shelter.Vaccines.Dtos;
using FluentValidation;

namespace API.Application.Features.Shelter.Vaccines.Validators
{
    public class UpdateVaccineValidator
    : AbstractValidator<UpdateVaccineDto>
    {
        public UpdateVaccineValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage(
                    "El nombre de la vacuna es requerido"
                )

                .MinimumLength(2)
                .WithMessage(
                    "El nombre debe tener mínimo 2 caracteres"
                )

                .MaximumLength(100)
                .WithMessage(
                    "El nombre debe tener máximo 100 caracteres"
                );
        }
    }
}
