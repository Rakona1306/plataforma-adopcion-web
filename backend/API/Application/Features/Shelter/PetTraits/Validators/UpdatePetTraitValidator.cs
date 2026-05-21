using API.Application.Features.Shelter.PetTraits.Dtos;
using FluentValidation;

namespace API.Application.Features.Shelter.PetTraits.Validators
{
    public class UpdatePetTraitValidator
    : AbstractValidator<UpdatePetTraitDto>
    {
        public UpdatePetTraitValidator()
        {
            RuleFor(x => x.TraitId)
                .NotEmpty()
                .WithMessage(
                    "El rasgo es requerido"
                );
        }
    }
}
