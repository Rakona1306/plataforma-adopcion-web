using API.Application.Features.Shelter.PetVaccines.Dtos;
using FluentValidation;

namespace API.Application.Features.Shelter.PetVaccines.Validators
{
    public class UpdatePetVaccineValidator
    : AbstractValidator<UpdatePetVaccineDto>
    {
        public UpdatePetVaccineValidator()
        {
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
