using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Bussiness.PricingSponsors.Dtos;
using FluentValidation;

namespace API.Application.Features.Bussiness.PricingSponsors.Validators
{
    public class CreatePricingSponsorValidator : AbstractValidator<CreatePricingSponsor>
    {
        public CreatePricingSponsorValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                    .WithMessage("El nombre del plan de patrocinio es obligatorio.")
                .MaximumLength(100)
                    .WithMessage("El nombre no puede exceder los 100 caracteres.")
                .Matches(@"^[a-zA-Z0-9\s\-_.]+$")
                    .WithMessage("El nombre solo puede contener letras, números, espacios, guiones, puntos y guiones bajos.");

            RuleFor(x => x.Description)
                .MaximumLength(500)
                    .WithMessage("La descripción no puede exceder los 500 caracteres.")
                .When(x => x.Description != null);

            RuleFor(x => x.ListPrice)
                .GreaterThanOrEqualTo(0)
                    .WithMessage("El precio de lista debe ser mayor o igual a 0.")
                .WithMessage("El precio de lista es obligatorio.");

            RuleFor(x => x.Price)
                .GreaterThanOrEqualTo(0)
                    .WithMessage("El precio debe ser mayor o igual a 0.")
                .WithMessage("El precio es obligatorio.");

            RuleFor(x => x)
                .Must(x => x.Price <= x.ListPrice)
                .WithMessage("El precio no puede ser mayor al precio de lista.")
                .When(x => x.ListPrice > 0);

            RuleFor(x => x.Currency)
                .NotEmpty()
                    .WithMessage("La moneda es obligatoria.")
                .Length(3)
                    .WithMessage("La moneda debe tener exactamente 3 caracteres (ej. PEN, USD).")
                .Matches(@"^[A-Z]{3}$")
                    .WithMessage("La moneda debe estar en formato ISO 4217 (3 letras mayúsculas, ej. PEN, USD).");
        }
    }
}