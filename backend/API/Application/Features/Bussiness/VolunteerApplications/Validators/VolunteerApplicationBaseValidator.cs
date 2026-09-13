using API.Application.Features.Bussiness.VolunteerApplications.Dtos.Common;
using FluentValidation;

namespace API.Application.Features.Bussiness.VolunteerApplications.Validators
{
    public abstract class VolunteerApplicationBaseValidator<T> : AbstractValidator<T>
        where T : BaseVolunteerApplicationDto
    {
        protected VolunteerApplicationBaseValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("El título es obligatorio.")
                .MaximumLength(200).WithMessage("El título no puede exceder los 200 caracteres.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("La descripción es obligatoria.");

            RuleFor(x => x.MinAge)
                .InclusiveBetween(0, 100).When(x => x.MinAge.HasValue)
                .WithMessage("La edad mínima debe estar entre 0 y 100.");

            RuleFor(x => x.MaxAge)
                .InclusiveBetween(0, 100).When(x => x.MaxAge.HasValue)
                .WithMessage("La edad máxima debe estar entre 0 y 100.");

            RuleFor(x => x.ContactEmail)
                .EmailAddress().When(x => !string.IsNullOrEmpty(x.ContactEmail))
                .WithMessage("El formato del email no es válido.");

            RuleFor(x => x.StartDate)
                .LessThan(x => x.EndDate)
                .When(x => x.StartDate.HasValue && x.EndDate.HasValue)
                .WithMessage("La fecha de inicio debe ser anterior a la fecha de fin.");

            RuleFor(x => x.IsCertified)
                   .NotEmpty().WithMessage("La cartificacion es obligatoria");

            RuleFor(x => x.Urgency)
                 .NotEmpty().WithMessage("La urgencia es obligatoria");
        }
    }
}
