using API.Application.Features.Shelter.PetPhotos.Dtos;
using FluentValidation;

namespace API.Application.Features.Shelter.PetPhotos.Validators
{
    public class CreatePetPhotoValidator : AbstractValidator<CreatePetPhotoDto>
    {

        private readonly string[] AllowedExtensions =
        [
            ".jpg",
            ".jpeg",
            ".png",
            ".webp"
        ];
        public CreatePetPhotoValidator()
        {
            RuleFor(x => x.PetId)
                .NotEmpty();

            RuleFor(x => x.File)
                .NotNull()
                .Must(file =>
                {
                    var extension = Path.GetExtension(
                        file.FileName
                    ).ToLower();

                    return AllowedExtensions
                        .Contains(extension);
                })
                .WithMessage(
                    "Solo imagenes son permitidas"
                );
        }
    }
}
