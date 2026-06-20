using API.Application.Features.Shelter.PetTraits.Dtos;
using FluentValidation;

namespace API.Application.Features.Shelter.PetTraits.Validators
{
    public class CreatePetTraitValidator
    : AbstractValidator<CreatePetTraitDto>
    {
        public CreatePetTraitValidator()
        {
            RuleFor(x => x.PetId)
                .NotEmpty()
                .WithMessage(
                    "La mascota es requerida"
                );

            RuleFor(x => x.TraitId)
                .NotEmpty()
                .WithMessage(
                    "El rasgo es requerido"
                );
        }
    }
}
