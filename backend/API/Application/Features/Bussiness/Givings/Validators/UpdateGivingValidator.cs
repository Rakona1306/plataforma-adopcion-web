using API.Application.Features.Bussiness.Givings.Dtos.Private;
using API.Domain.Model.Bussiness;
using FluentValidation;

namespace API.Application.Features.Bussiness.Givings.Validators
{
    public class UpdateGivingValidator : AbstractValidator<UpdateGivingDto>
    {
        public UpdateGivingValidator()
        {
            // Reutilizamos la misma lógica estricta de validación para la edición
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("El nombre de la donación es requerido.")
                .MaximumLength(150).WithMessage("El nombre no puede superar los 150 caracteres.");

            RuleFor(x => x.Type)
                .IsInEnum().WithMessage("El tipo de donación seleccionado es inválido.");

            When(x => x.Type == GivingType.MONEY, () =>
            {
                RuleFor(x => x.Amount)
                    .NotEmpty().WithMessage("El monto es requerido para donaciones monetarias.")
                    .GreaterThan(0).WithMessage("El monto debe ser mayor a 0.");

                RuleFor(x => x.Quantity).Null().WithMessage("La cantidad no aplica para dinero.");
                RuleFor(x => x.Unit).Null().WithMessage("La unidad de medida no aplica para dinero.");
                RuleFor(x => x.Kg).Null().WithMessage("El peso en kilogramos no aplica para donaciones monetarias.");
            });

            When(x => x.Type == GivingType.GOODS, () =>
            {
                RuleFor(x => x.Quantity)
                    .NotEmpty().WithMessage("La cantidad es requerida para donaciones físicas.")
                    .GreaterThan(0).WithMessage("La cantidad debe ser mayor a 0.");

                RuleFor(x => x.Unit)
                    .NotEmpty().WithMessage("La unidad de medida es requerida para donaciones físicas.")
                    .IsInEnum().WithMessage("La unidad de medida seleccionada es inválida.");

                RuleFor(x => x.Kg)
                    .NotEmpty().WithMessage("El peso en kilogramos es requerido para donaciones físicas.")
                    .GreaterThan(0).WithMessage("El peso en kilogramos debe ser mayor a 0.");

                RuleFor(x => x.Amount).Null().WithMessage("El monto no aplica para donaciones físicas.");
            });
        }
    }
}