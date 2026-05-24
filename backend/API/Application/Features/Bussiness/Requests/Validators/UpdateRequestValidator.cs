using API.Application.Features.Bussiness.Requests.Dtos;
using FluentValidation;

namespace API.Application.Features.Bussiness.Requests.Validators;

public class UpdateRequestValidator : AbstractValidator<UpdateRequestDto>
{
    public UpdateRequestValidator()
    {
        RuleFor(x => x.District).NotEmpty().WithMessage("El distrito es requerido.");
        RuleFor(x => x.Phone).NotEmpty().WithMessage("El teléfono es requerido.");
        RuleFor(x => x.Motivation).NotEmpty().WithMessage("La motivación es requerida.");
    }
}