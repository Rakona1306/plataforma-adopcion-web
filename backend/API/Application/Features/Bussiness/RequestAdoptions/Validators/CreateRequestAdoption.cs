using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Bussiness.RequestAdoptions.Dtos.Private;
using FluentValidation;

namespace API.Application.Features.Bussiness.RequestAdoptions.Validators
{
    public class CreateRequestAdoptionValidator : AbstractValidator<CreateRequestAdoption>
    {
        public CreateRequestAdoptionValidator()
        {
            RuleFor(x => x.PetId)
                .NotEmpty()
                    .WithMessage("La mascota es obligatoria.");

            RuleFor(x => x.UserId)
                .NotEmpty()
                    .WithMessage("El usuario es obligatorio.");

            RuleFor(x => x.HouseType)
                .NotEmpty()
                    .WithMessage("El tipo de vivienda es obligatorio.")
                .MaximumLength(50)
                    .WithMessage("El tipo de vivienda no puede exceder los 50 caracteres.");

            RuleFor(x => x.District)
                .NotEmpty()
                    .WithMessage("El distrito es obligatorio.")
                .MaximumLength(100)
                    .WithMessage("El distrito no puede exceder los 100 caracteres.");

            RuleFor(x => x.Phone)
                .NotEmpty()
                    .WithMessage("El teléfono es obligatorio.")
                .MaximumLength(15)
                    .WithMessage("El teléfono no puede exceder los 15 caracteres.")
                .Matches(@"^[\+]?[0-9\s\-\(\)]{7,15}$")
                    .WithMessage("El teléfono debe tener un formato válido (ej. +51 999 999 999 o 999999999).");

            RuleFor(x => x.Motivation)
                .NotEmpty()
                    .WithMessage("La motivación es obligatoria.")
                .MinimumLength(20)
                    .WithMessage("La motivación debe tener al menos 20 caracteres.")
                .MaximumLength(2000)
                    .WithMessage("La motivación no puede exceder los 2000 caracteres.");

            // Validación personalizada: si tiene otras mascotas, debería describirlas
            // (opcional, si agregas el campo OtherPetsDescription)
            RuleFor(x => x.HasOtherPets)
                .NotNull()
                    .WithMessage("Debe indicar si tiene otras mascotas.");

            RuleFor(x => x.HasChildren)
                .NotNull()
                    .WithMessage("Debe indicar si tiene niños en casa.");

            RuleFor(x => x.AcceptHomeVisit)
                .NotNull()
                    .WithMessage("Debe indicar si acepta una visita domiciliaria.");
        }
    }
}