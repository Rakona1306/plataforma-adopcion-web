using API.Domain.Common.Model;

namespace API.Domain.Model.Shelter
{
    public class Specie : BaseModel
    {
        public string Name { get; set; } = string.Empty;

        public ICollection<Breed> Breeds { get; set; } = [];
    }
}
