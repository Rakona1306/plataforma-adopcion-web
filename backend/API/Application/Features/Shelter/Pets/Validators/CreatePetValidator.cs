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

            RuleFor(x => x.WeightKg)
                .GreaterThan(0)
                .When(x => x.WeightKg.HasValue);

            RuleFor(x => x.BreedIds)
                .NotEmpty();

            RuleFor(x => x.TraitIds)
                .NotEmpty();
        }
    }
}
