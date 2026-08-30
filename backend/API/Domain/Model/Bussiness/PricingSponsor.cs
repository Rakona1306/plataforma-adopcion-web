using API.Domain.Common.Model;

namespace API.Domain.Model.Bussiness
{
    public class PricingSponsor : BaseModelInt
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; } = null;
        public int GivingId { get; set; }
        public Giving Giving { get; set; } = new();
        public bool IsRelevant { get; set; } = false;
        public bool IsActive { get; set; } = true;
        public string? Benefits { get; set; } = null;
    }
}