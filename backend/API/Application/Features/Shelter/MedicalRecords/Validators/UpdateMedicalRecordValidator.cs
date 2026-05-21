using API.Application.Features.Shelter.MedicalRecords.Dtos;
using FluentValidation;

namespace API.Application.Features.Shelter.MedicalRecords.Validators
{
    public class UpdateMedicalRecordValidator
    : AbstractValidator<UpdateMedicalRecordDto>
    {
        public UpdateMedicalRecordValidator()
        {
            RuleFor(x => x.PetId)
                .NotEmpty()
                .WithMessage("La mascota es requerida");

            RuleFor(x => x.VisitDate)
                .NotEmpty()
                .WithMessage("La fecha de visita es requerida");

            RuleFor(x => x.Diagnosis)
                .NotEmpty()
                .WithMessage("El diagnóstico es requerido")

                .MinimumLength(3)
                .WithMessage("El diagnóstico debe tener mínimo 3 caracteres")

                .MaximumLength(500)
                .WithMessage("El diagnóstico debe tener máximo 500 caracteres");

            RuleFor(x => x.Treatment)
                .MaximumLength(1000)
                .WithMessage("El tratamiento debe tener máximo 1000 caracteres");

            RuleFor(x => x.Notes)
                .MaximumLength(1000)
                .WithMessage("Las notas deben tener máximo 1000 caracteres");
        }
    }
}
