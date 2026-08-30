using API.Application.Features.Bussiness.Adoptions.Dtos.Private;
using FluentValidation;

namespace API.Application.Features.Bussiness.Adoptions.Validators
{
    public class UpdateAdoptionStatusValidator : AbstractValidator<UpdateAdoptionStatus>
    {
        public UpdateAdoptionStatusValidator()
        {
            RuleFor(x => x.Status)
                .IsInEnum().WithMessage("El estado de la adopción seleccionado es inválido.");
        }
    }
}