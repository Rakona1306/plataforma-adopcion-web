using API.Application.Features.Bussiness.Adoptions.Dtos.Private.Relations;
using API.Domain.Model.Enums;

namespace API.Application.Features.Bussiness.Adoptions.Dtos.Relations
{
    public class Adop_PetResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public Adop_SpecieResponse Species { get; set; } = null!;
        public int Age { get; set; }

        public string Gender { get; set; } = string.Empty;

        public string Size { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;
    }
}