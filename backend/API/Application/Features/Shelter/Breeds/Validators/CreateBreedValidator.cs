using API.Application.Features.Shelter.Breeds.Dtos;
using FluentValidation;

namespace API.Application.Features.Shelter.Breeds.Validators
{
    public class CreateBreedValidator
    : AbstractValidator<CreateBreedDto>
    {
        public CreateBreedValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("El nombre es requerido")

                .MinimumLength(2)
                .WithMessage("El nombre debe tener mínimo 2 caracteres")

                .MaximumLength(100)
                .WithMessage("El nombre debe tener máximo 100 caracteres");

            RuleFor(x => x.SpeciesId)
                .NotEmpty()
                .WithMessage("La especie es requerida");
        }
    }
}
