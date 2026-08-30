using System.ComponentModel.DataAnnotations;
using API.Domain.Common.Model;

namespace API.Domain.Model.Bussiness
{
    public class AdoptionFollowUp : BaseModelInt
    {
        public int AdoptionId { get; set; }
        public DateTime FollowUpDate { get; set; }
        public FollowUpType Type { get; set; }
        public FollowUpStatus Status { get; set; }
        public string Title { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string Notes { get; set; } = string.Empty;
        public Adoption Adoption { get; set; } = null!;
    }

    public enum FollowUpType
    {
        VISITA_DEL_VETERINARIO = 1,
        VISITA_A_CASA = 2,
        LLAMADA_TELEFONICA = 3,
        VIDEOLLAMADA = 4,
        WHATSAPP = 5,
        FOTOS_O_VIDEOS = 6
    }

    public enum FollowUpStatus
    {
        INCIDENTE = 1,
        RUTINA = 2,
        INCOMODIDAD = 3
    }
}