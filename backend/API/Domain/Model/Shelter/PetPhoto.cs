using API.Domain.Common.Model;

namespace API.Domain.Model.Shelter
{
    public class PetPhoto : BaseModel
    {
        public string Url { get; set; } = string.Empty;

        public bool IsMain { get; set; }

        public Guid PetId { get; set; }
        public Pet Pet { get; set; } = null!;
    }
}
