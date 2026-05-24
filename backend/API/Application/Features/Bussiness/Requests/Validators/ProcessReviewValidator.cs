using API.Application.Features.Bussiness.Requests.Dtos;
using API.Domain.Model.Enums;
using FluentValidation;

namespace API.Application.Features.Bussiness.Requests.Validators;

public class ProcessReviewValidator : AbstractValidator<ProcessReviewDto>
{
    public ProcessReviewValidator()
    {
        RuleFor(x => x.Status)
            .Must(s => s == RequestStatus.APROBADO ||
                       s == RequestStatus.RECHAZADO) // Ajusta según tus nombres de Enums de estado
            .WithMessage("El estado de revisión debe ser Aprobado o Rechazado.");

        RuleFor(x => x.ReviewComment)
            .NotEmpty().WithMessage("El comentario de la revisión es obligatorio.");
    }
}