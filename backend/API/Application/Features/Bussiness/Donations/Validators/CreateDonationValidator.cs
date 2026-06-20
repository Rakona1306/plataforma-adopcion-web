using API.Application.Features.Bussiness.Donations.Dtos;
using FluentValidation;

namespace API.Application.Features.Bussiness.Donations.Validators;

public class CreateDonationValidator : AbstractValidator<CreateDonationDto>
{
    public CreateDonationValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty()
            .WithMessage("El usuario es requerido.");

        RuleFor(x => x.Amount)
            .GreaterThan(0)
            .WithMessage("El monto de la donación debe ser mayor a 0.");

        RuleFor(x => x.Currency)
            .NotEmpty()
            .Length(3)
            .WithMessage("El código de moneda debe tener exactamente 3 caracteres (ej. PEN, USD).");

        RuleFor(x => x.Type)
            .IsInEnum()
            .WithMessage("El tipo de donación no es válido.");

        RuleFor(x => x.Status)
            .IsInEnum()
            .WithMessage("El estado de la donación no es válido.");
            
        RuleFor(x => x.DonationDate)
            .NotEmpty()
            .WithMessage("La fecha de donación es requerida.");
    }
}