using API.Application.Features.Bussiness.Donations.Dtos;
using FluentValidation;

namespace API.Application.Features.Bussiness.Donations.Validators;

public class UpdateDonationValidator: AbstractValidator<UpdateDonationDto>
{
    public UpdateDonationValidator()
    {
        RuleFor(x => x.Status)
            .IsInEnum()
            .WithMessage("El estado de la donación no es válido.");
    }
}