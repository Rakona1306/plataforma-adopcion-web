using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Features.Shelter.Pets.Dtos.Public
{
    public class PetPubFilterDto
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string Search { get; set; } = string.Empty;
        public string Sort { get; set; } = string.Empty;

        public string? Gender { get; set; }
        public string? SpecieId { get; set; }
        public string? Size { get; set; }
        public string? BreedId { get; set; }
        public int? MinAge { get; set; }
        public int? MaxAge { get; set; }

        // 🔥 CAMBIO CLAVE: Retornar arreglos fijos (T[]) en lugar de interfaces abstractas
        public int[] ParseGenders() => ParseStringToIntArray(Gender);
        public int[] ParseSizes() => ParseStringToIntArray(Size);
        public Guid[] ParseSpeciesIds() => ParseStringToGuidArray(SpecieId);
        public Guid[] ParseBreedIds() => ParseStringToGuidArray(BreedId);

        private static int[] ParseStringToIntArray(string? value) =>
            string.IsNullOrWhiteSpace(value) ? [] : value.Split(',').Select(int.Parse).ToArray();

        private static Guid[] ParseStringToGuidArray(string? value) =>
            string.IsNullOrWhiteSpace(value) ? [] : value.Split(',').Select(Guid.Parse).ToArray();
    }
}