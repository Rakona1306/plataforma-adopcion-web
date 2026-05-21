using API.Application.Features.Shelter.PetBreeds.Dtos;
using FluentValidation;

namespace API.Application.Features.Shelter.PetBreeds.Validators
{
    public class UpdatePetBreedValidator
    : AbstractValidator<UpdatePetBreedDto>
    {
        public UpdatePetBreedValidator()
        {
            RuleFor(x => x.PetId)
                .NotEmpty()
                .WithMessage("La mascota es requerida");

            RuleFor(x => x.BreedId)
                .NotEmpty()
                .WithMessage("La raza es requerida");

            RuleFor(x => x.Percentage)
                .InclusiveBetween(0, 100)
                .WithMessage(
                    "El porcentaje debe estar entre 0 y 100"
                );
        }
    }
}
