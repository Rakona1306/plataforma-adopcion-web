using API.Application.Features.Shelter.PetVaccines.Dtos;
using FluentValidation;

namespace API.Application.Features.Shelter.PetVaccines.Validators
{
    public class CreatePetVaccineValidator
    : AbstractValidator<CreatePetVaccineDto>
    {
        public CreatePetVaccineValidator()
        {
            RuleFor(x => x.PetId)
                .NotEmpty()
                .WithMessage(
                    "La mascota es requerida"
                );

            RuleFor(x => x.VaccineId)
                .NotEmpty()
                .WithMessage(
                    "La vacuna es requerida"
                );

            RuleFor(x => x.AppliedDate)
                .NotEmpty()
                .WithMessage(
                    "La fecha de aplicación es requerida"
                );

            RuleFor(x => x.ExpirationDate)
                .GreaterThan(x => x.AppliedDate)
                .When(x => x.ExpirationDate.HasValue)
                .WithMessage(
                    "La fecha de expiración debe ser mayor a la fecha de aplicación"
                );
        }
    }
}
