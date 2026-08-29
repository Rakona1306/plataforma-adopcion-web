using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Features.Shelter.Pets.Dtos.Private
{
    public class PetMostRequestedResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? RescueStory { get; set; }
        public DateOnly? BirthDate { get; set; }
        public decimal? WeightKg { get; set; }
        public string? Slug { get; set; }
        public bool IsVaccinated { get; set; }
        public bool? IsRecommend { get; set; }
        public bool IsSterilized { get; set; }
        public bool IsAdopted { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string Size { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;

        public SpecieItem Species { get; set; } = null!;
        public List<PetPhotoItem> Photos { get; set; } = [];

        // Solo se llena manualmente desde el Service (no viene de Pet)
        public int RequestCount { get; set; }
    }

    public class SpecieItem
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    public class PetPhotoItem
    {
        public Guid Id { get; set; }
        public string Url { get; set; } = string.Empty;
        public bool IsMain { get; set; }
    }
}