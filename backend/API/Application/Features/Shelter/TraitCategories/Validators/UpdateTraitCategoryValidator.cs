using API.Application.Features.Shelter.TraitCategories.Dtos;
using FluentValidation;

namespace API.Application.Features.Shelter.TraitCategories.Validators
{
    public class UpdateTraitCategoryValidator : AbstractValidator<UpdateTraitCategoryDto>
    {
        public UpdateTraitCategoryValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("El nombre es requerido")
                .MinimumLength(3)
                .WithMessage("El nombre debe tener mínimo 3 caracteres")
                .MaximumLength(100)
                .WithMessage("El nombre debe tener máximo 100 caracteres");

            RuleFor(x => x.Description)
                .MaximumLength(300)
                .WithMessage("La descripción debe tener máximo 300 caracteres");
        }
    }
}
