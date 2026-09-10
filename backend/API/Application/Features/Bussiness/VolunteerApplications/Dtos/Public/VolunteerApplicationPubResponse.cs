using API.Domain.Model.Bussiness;

namespace API.Application.Features.Bussiness.VolunteerApplications.Dtos.Public
{
    /// <summary>
    /// Respuesta pública optimizada para voluntarios.
    /// Excluye campos de auditoría, IDs internos y fechas de gestión.
    /// </summary>
    public class VolunteerApplicationPublicResponse
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? SubTitle { get; set; }
        public string Description { get; set; } = string.Empty;
        public string? Requirements { get; set; }

        // Información logística relevante para el voluntario
        public int? MinAge { get; set; }
        public int? MaxAge { get; set; }
        public string? Address { get; set; }
        public string? GoogleMapLinkAddress { get; set; }

        // Fechas de la actividad (NO las de auditoría)
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        // Canales de contacto
        public string? ContactEmail { get; set; }
        public string? ContactPhone { get; set; }

        // Metadatos útiles para el usuario final
        public bool IsCertified { get; set; }
        public UrgencyLevel Urgency { get; set; }
    }
}
