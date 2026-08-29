using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Bussiness.RequestAdoptions.Dtos.Private;
using API.Domain.Model.Enums;
using FluentValidation;

namespace API.Application.Features.Bussiness.RequestAdoptions.Validators
{
    public class ReviewRequestAdoptionValidator : AbstractValidator<ReviewRequestAdoption>
    {
        public ReviewRequestAdoptionValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0)
                    .WithMessage("El Id de la solicitud debe ser mayor a 0.");

            RuleFor(x => x.Status)
                .IsInEnum()
                    .WithMessage("El estado no es válido.")
                .Must(BeAReviewableStatus)
                    .WithMessage("El estado debe ser APROBADO o RECHAZADO para revisar una solicitud.");

            // Si está rechazado, el comentario es obligatorio
            When(x => x.Status == RequestStatus.RECHAZADO, () =>
            {
                RuleFor(x => x.ReviewComment)
                    .NotEmpty()
                        .WithMessage("Debe proporcionar un motivo cuando se rechaza una solicitud.")
                    .MinimumLength(10)
                        .WithMessage("El motivo del rechazo debe tener al menos 10 caracteres.")
                    .MaximumLength(1000)
                        .WithMessage("El motivo del rechazo no puede exceder los 1000 caracteres.");
            });

            // Si está aprobado, el comentario es opcional pero no puede ser muy corto
            When(x => x.Status == RequestStatus.APROBADO && !string.IsNullOrWhiteSpace(x.ReviewComment), () =>
            {
                RuleFor(x => x.ReviewComment)
                    .MaximumLength(1000)
                        .WithMessage("El comentario no puede exceder los 1000 caracteres.");
            });

            // Validación general del comentario (cuando existe)
            When(x => !string.IsNullOrWhiteSpace(x.ReviewComment), () =>
            {
                RuleFor(x => x.ReviewComment)
                    .MaximumLength(1000)
                        .WithMessage("El comentario no puede exceder los 1000 caracteres.");
            });
        }

        private bool BeAReviewableStatus(RequestStatus status)
        {
            return status == RequestStatus.APROBADO || status == RequestStatus.RECHAZADO;
        }
    }
}