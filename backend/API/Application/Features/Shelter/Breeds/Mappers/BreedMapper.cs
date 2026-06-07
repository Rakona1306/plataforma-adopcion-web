using API.Application.Features.Shelter.Breeds.Dtos;
using API.Domain.Model.Shelter;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Shelter.Breeds.Mappers
{
    [Mapper]
    public partial class BreedMapper
    {
        public partial Breed ToEntity(CreateBreedDto dto);

        public partial void Update(UpdateBreedDto dto, [MappingTarget] Breed entity);

        // Mapeo manual para controlar el null de Species
        public BreedResponse ToResponse(Breed entity)
        {
            // Llamamos al mapeo generado automáticamente para las propiedades básicas
            var response = ToResponseInternal(entity);

            // Manejamos la lógica del null manualmente
            response.SpeciesName = entity.Species?.Name ?? "Sin especie";

            return response;
        }

        // Mapperly generará esta parte automáticamente para las propiedades que coincidan
        [MapperIgnoreTarget(nameof(BreedResponse.SpeciesName))]
        private partial BreedResponse ToResponseInternal(Breed entity);

        public partial List<BreedResponse> ToResponseList(List<Breed> entities);
    }
}
