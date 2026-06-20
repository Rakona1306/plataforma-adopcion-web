using API.Application.Features.Shelter.Breeds.Dtos;
using API.Application.Features.Shelter.Pets.Dtos;
using API.Application.Features.Shelter.Traits.Dtos;
using API.Domain.Model.Shelter;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Shelter.Pets.Mappers
{
    [Mapper]
    public partial class PetMapper
    {
        // Mapeo inicial para creación (Ignoramos colecciones manejadas en el servicio)
        [MapperIgnoreTarget(nameof(Pet.PetBreeds))]
        [MapperIgnoreTarget(nameof(Pet.PetTraits))]
        [MapperIgnoreTarget(nameof(Pet.Photos))]
        [MapperIgnoreTarget(nameof(Pet.MedicalRecords))]
        [MapperIgnoreTarget(nameof(Pet.PetSponsors))]
        public partial Pet ToEntity(CreatePetDto dto);

        [MapperIgnoreTarget(nameof(Pet.PetBreeds))]
        [MapperIgnoreTarget(nameof(Pet.PetTraits))]
        [MapperIgnoreTarget(nameof(Pet.Photos))]
        [MapperIgnoreTarget(nameof(Pet.MedicalRecords))]
        [MapperIgnoreTarget(nameof(Pet.PetSponsors))]
        [MapperIgnoreTarget(nameof(Pet.Species))]
        public partial void Update(UpdatePetDto dto, [MappingTarget] Pet entity);

        // Mapeo de respuesta profesional
        public PetResponse ToResponse(Pet entity)
        {
            var response = ToResponseInternal(entity);

            // Aplanado de relaciones y conversión de Enums a String

            response.SpeciesName = entity.Species?.Name ?? "Sin especie";
            response.Gender = new ;
            response.Size = entity.Size.ToString();
            response.Status = entity.Status.ToString();

            // Colecciones
            response.Breeds = entity.PetBreeds?.Select(pb => new OptionBreedResponse
            {
                Id = pb.Breed.Id,
                Name = pb.Breed.Name,
            }).ToList() ?? [];
            response.Traits = entity.PetTraits?.Select(pt => new OptionTraitResponse
            {
                Id = pt.Trait.Id,
                Name = pt.Trait.Name
            }).ToList() ?? [];
            response.PhotoUrls = entity.Photos?.Select(p => p.Url).ToList() ?? [];

            return response;
        }

        // Ignoramos en la parte automática todo lo que mapeamos manualmente arriba
        [MapperIgnoreTarget(nameof(PetResponse.SpeciesName))]
        [MapperIgnoreTarget(nameof(PetResponse.Gender))]
        [MapperIgnoreTarget(nameof(PetResponse.Size))]
        [MapperIgnoreTarget(nameof(PetResponse.Status))]
        [MapperIgnoreTarget(nameof(PetResponse.Breeds))]
        [MapperIgnoreTarget(nameof(PetResponse.Traits))]
        [MapperIgnoreTarget(nameof(PetResponse.PhotoUrls))]
        private partial PetResponse ToResponseInternal(Pet entity);

        public partial List<PetResponse> ToResponseList(List<Pet> entities);
    }
}
