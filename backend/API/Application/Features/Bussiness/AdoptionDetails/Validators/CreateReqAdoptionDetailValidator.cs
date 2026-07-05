using API.Application.Features.Bussiness.AdoptionDetails.Dtos;
using FluentValidation;

namespace API.Application.Features.Bussiness.AdoptionDetails.Validators;

public class CreateReqAdoptionDetailValidator : AbstractValidator<CreateReqAdoptionDetail>
{
    public CreateReqAdoptionDetailValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty().WithMessage("El usuario es requerido.");

        RuleFor(x => x.District)
            .NotEmpty().WithMessage("El distrito es requerido.");

        RuleFor(x => x.Phone)
            .NotEmpty().WithMessage("El teléfono es requerido.");

        RuleFor(x => x.Motivation)
            .NotEmpty().WithMessage("La motivación es requerida.");

        RuleFor(x => x.PetId)
            .NotEmpty().WithMessage("Para una adopción se requiere especificar la mascota.");

        RuleFor(x => x.HouseType)
            .NotEmpty().WithMessage("El tipo de vivienda es requerido.");

        RuleFor(x => x.AcceptHomeVisit)
            .NotNull().WithMessage("Debe especificar si acepta visitas a domicilio.");
    }
}
