using System.ComponentModel.DataAnnotations;
using API.Domain.Common.Model;
using API.Domain.Model.Enums;
using API.Domain.Model.Organization;
using API.Domain.Model.Shelter;

namespace API.Domain.Model.Bussiness
{
    public class Request : BaseModel
    {
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;

        public RequestType Type { get; set; }

        public RequestStatus Status { get; set; }

        public string Motivation { get; set; } = string.Empty;

        // ──────────────────── INFORMACIÓN DE CONTACTO ────────────────────

        public string District { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        // ──────────────────── INFORMACIÓN OPCIONAL ────────────────────

        public string? Notes { get; set; }

        // ──────────────────── RELACIÓN CON MASCOTA (Adopción/Apadrinamiento) ────────────────────

        public Guid? PetId { get; set; }

        public Pet? Pet { get; set; }

        // ──────────────────── DATOS DE ADOPCIÓN ────────────────────

        public Guid? AdoptionDetailsId { get; set; }

        public AdoptionDetails? AdoptionDetails { get; set; }

        // ──────────────────── DATOS DE DONACIÓN ────────────────────

        public Guid? DonationDetailsId { get; set; }

        public DonationDetails? DonationDetails { get; set; }

        // ──────────────────── DATOS DE APADRINAMIENTO ────────────────────

        public Guid? SponsorshipDetailsId { get; set; }

        public SponsorshipDetails? SponsorshipDetails { get; set; }

        // ──────────────────── DATOS DE VOLUNTARIADO ────────────────────

        public Guid? VolunteerDetailsId { get; set; }

        public VolunteerDetails? VolunteerDetails { get; set; }

        // ──────────────────── AUDITORÍA / REVISIÓN ────────────────────

        public DateTime? ReviewedAt { get; set; }

        public Guid? ReviewedBy { get; set; }

        public User? Reviewer { get; set; }

        public string? ReviewComment { get; set; }
    }

    public class AdoptionDetails
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid RequestId { get; set; }

        public Request Request { get; set; } = null!;

        public string HouseType { get; set; } = string.Empty;

        public bool HasOtherPets { get; set; }

        public bool HasChildren { get; set; }

        public bool AcceptHomeVisit { get; set; }
    }

    public class DonationDetails
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid RequestId { get; set; }

        public Request Request { get; set; } = null!;

        public decimal Amount { get; set; }

        public bool IsRecurring { get; set; }

        public string? Message { get; set; }

        public DateTime? NextRecurringDate { get; set; }
    }

    public class SponsorshipDetails
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid RequestId { get; set; }

        public Request Request { get; set; } = null!;

        public decimal MonthlyAmount { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public bool IsActive { get; set; }
    }

    public class VolunteerDetails
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid RequestId { get; set; }

        public Request Request { get; set; } = null!;

        public Guid VolunteerAreaId { get; set; }

        public VolunteerArea VolunteerArea { get; set; } = null!;

        public string? Experience { get; set; }

        public int AvailableHoursPerWeek { get; set; }

        public bool IsActive { get; set; }
    }
}
