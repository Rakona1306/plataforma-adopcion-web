using API.Domain.Common.Model;
using API.Domain.Model.Enums;

namespace API.Domain.Model.Shelter
{
    public class Pet : BaseModel
    {
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public string? RescueStory { get; set; }

        public DateOnly? BirthDate { get; set; }

        public decimal? WeightKg { get; set; }

        public string? Slug { get; set; }

        public bool IsVaccinated { get; set; }

        public bool? IsRecommend { get; set; } = false;

        public bool IsSterilized { get; set; }

        public bool IsAdopted { get; set; }
        public int Age { get; set; }

        public PetGender Gender { get; set; }

        public PetSize Size { get; set; }

        public PetStatus Status { get; set; }

        // SPECIES

        public Guid SpeciesId { get; set; }

        public Specie Species { get; set; }
            = null!;

        // MANY TO MANY

        public ICollection<PetBreed> PetBreeds { get; set; } = [];

        public ICollection<PetTrait> PetTraits { get; set; } = [];

        public ICollection<PetVaccine> PetVaccines { get; set; } = [];

        // PHOTOS

        public ICollection<PetPhoto> Photos { get; set; } = [];

        // MEDICAL RECORDS

        public ICollection<MedicalRecord> MedicalRecords { get; set; } = [];

        public ICollection<PetSponsor> PetSponsors { get; set; } = [];
    }
}
