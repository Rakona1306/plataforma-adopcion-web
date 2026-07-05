using API.Application.Features.Bussiness.AdoptionDetails.Dtos;
using FluentValidation;

namespace API.Application.Features.Bussiness.AdoptionDetails.Validators;

public class UpdateReqAdoptionDetailValidator : AbstractValidator<UpdateReqAdoptionDetail>
{
    public UpdateReqAdoptionDetailValidator()
    {
        RuleFor(x => x.District)
            .NotEmpty().WithMessage("El distrito es requerido.");

        RuleFor(x => x.Phone)
            .NotEmpty().WithMessage("El teléfono es requerido.");

        RuleFor(x => x.Motivation)
            .NotEmpty().WithMessage("La motivación es requerida.");

        RuleFor(x => x.HouseType)
            .NotEmpty().WithMessage("El tipo de vivienda es requerido.");
    }
}
