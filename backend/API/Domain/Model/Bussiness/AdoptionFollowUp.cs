using System.ComponentModel.DataAnnotations;
using API.Domain.Common.Model;

namespace API.Domain.Model.Bussiness
{
    public class AdoptionFollowUp : BaseModelInt
    {
        public int AdoptionId { get; set; }
        public DateTime FollowUpDate { get; set; }
        public FollowUpType Type { get; set; }
        [MaxLength(1000)]
        public string Notes { get; set; } = string.Empty;
        public Adoption Adoption { get; set; } = null!;
    }

    public enum FollowUpType
    {
        VET_VISIT = 1,
        HOME_VISIT = 2,
        PHONE_CALL = 3,
        VIDEO_CALL = 4,
        PHOTO_UPDATE = 5
    }
}