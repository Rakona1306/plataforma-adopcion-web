using API.Application.Features.Shelter.Species.Dtos;
using FluentValidation;

namespace API.Application.Features.Shelter.Species.Validations
{
    public class CreateSpecieValidator: AbstractValidator<CreateSpeciesDto>
    {
        public CreateSpecieValidator() {
            RuleFor(x => x.Name)
            .NotEmpty()
            .MinimumLength(2)
            .MaximumLength(100);
        }
    }
}
