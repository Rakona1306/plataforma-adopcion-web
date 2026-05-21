using API.Application.Features.Shelter.Traits.Dtos;
using FluentValidation;

namespace API.Application.Features.Shelter.Traits.Validators
{
    public class CreateTraitValidator
    : AbstractValidator<CreateTraitDto>
    {
        public CreateTraitValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("El nombre es requerido")

                .MinimumLength(2)
                .WithMessage("El nombre debe tener mínimo 2 caracteres")

                .MaximumLength(100)
                .WithMessage("El nombre debe tener máximo 100 caracteres");

            RuleFor(x => x.CategoryId)
                .NotEmpty()
                .WithMessage("La categoría es requerida");
        }
    }
}
