using API.Application.Features.Shelter.Pets.Dtos;
using FluentValidation;

namespace API.Application.Features.Shelter.Pets.Validators
{
    public class CreatePetValidator
    : AbstractValidator<CreatePetDto>
    {
        public CreatePetValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .MinimumLength(2)
                .MaximumLength(100);

            RuleFor(x => x.SpeciesId)
                .NotEmpty();

            RuleFor(x => x.Description)
                .MaximumLength(500);
            RuleFor(x => x.RescueStory)
                .MaximumLength(1000);
            RuleFor(x => x.Age)
                .GreaterThanOrEqualTo(0)
                .WithMessage("La edad debe ser un número positivo")
                .NotEmpty()
                .WithMessage("La edad es obligatoria");

            RuleFor(x => x.WeightKg)
                .GreaterThan(0)
                .When(x => x.WeightKg.HasValue);
        }
    }
}
