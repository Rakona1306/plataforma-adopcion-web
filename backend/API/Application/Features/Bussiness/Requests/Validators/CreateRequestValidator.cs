using API.Application.Features.Bussiness.Requests.Dtos;
using API.Domain.Model.Enums;
using FluentValidation;

namespace API.Application.Features.Bussiness.Requests.Validators;

public class CreateRequestValidator : AbstractValidator<CreateRequestDto>
{
    public CreateRequestValidator()
    {
        RuleFor(x => x.UserId).NotEmpty().WithMessage("El usuario es requerido.");
        RuleFor(x => x.District).NotEmpty().WithMessage("El distrito es requerido.");
        RuleFor(x => x.Phone).NotEmpty().WithMessage("El teléfono es requerido.");
        RuleFor(x => x.Type).IsInEnum().WithMessage("El tipo de solicitud no es válido.");
        RuleFor(x => x.Motivation).NotEmpty().WithMessage("La motivación es requerida.");

        // Reglas condicionales por Tipo de Solicitud (Enums)

        // 1. ADOPCIÓN
        When(x => x.Type == RequestType.ADOPCION, () => {
            RuleFor(x => x.PetId).NotEmpty().WithMessage("Para una adopción se requiere especificar la mascota.");
            RuleFor(x => x.HouseType).NotEmpty().WithMessage("El tipo de vivienda es requerido.");
            RuleFor(x => x.AcceptHomeVisit).NotNull().WithMessage("Debe especificar si acepta visitas a domicilio.");
        });

        // 2. DONACIÓN
        When(x => x.Type == RequestType.DONACION, () => {
            RuleFor(x => x.DonationAmount).NotNull().GreaterThan(0).WithMessage("El monto de donación debe ser mayor a 0.");
        });

        // 4. VOLUNTARIADO
        When(x => x.Type == RequestType.VOLUNTARIADO, () => {
            RuleFor(x => x.VolunteerAreaId).NotEmpty().WithMessage("El área de voluntariado es requerida.");
            RuleFor(x => x.AvailableHoursPerWeek).NotNull().GreaterThan(0).WithMessage("Las horas semanales disponibles deben ser mayores a 0.");
        });

        // 5. PADRINO (Sponsorship)
        When(x => x.Type == RequestType.PADRINO, () => {
            RuleFor(x => x.PetId).NotEmpty().WithMessage("Para ser padrino es obligatorio asociar una mascota (PetId).");
            RuleFor(x => x.SponsorshipAmount).NotNull().GreaterThan(0).WithMessage("El monto de apadrinamiento debe ser mayor a 0.");
            RuleFor(x => x.SponsorshipStartDate).NotNull().WithMessage("La fecha de inicio de apadrinamiento es requerida.");
        });
    }
}