using API.Domain.Common.Model;

namespace API.Domain.Model.Bussiness
{
    public class Event : BaseModelInt
    {
        public string Title { get; set; } = null!;
        public string? SubTitle { get; set; } = null!;
        public string? Description { get; set; } = null!;
        public string? ToDo { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? ImageUrl { get; set; } = null!;
        public string? BannerUrl { get; set; } = null!;
        public string? VideoUrl { get; set; } = null!;
        public string? VideoSilenceUrl { get; set; } = null!;
        public bool IsActive { get; set; } = true;
        public bool IsFeatured { get; set; } = false;
        public string? GoogleAddressLink { get; set; } = null!;
        public string? Location { get; set; } = null!;
    }
}