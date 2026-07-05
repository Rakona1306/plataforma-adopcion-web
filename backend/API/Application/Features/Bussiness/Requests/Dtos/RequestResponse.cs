using API.Domain.Model.Enums;

namespace API.Application.Features.Bussiness.Requests.Dtos;

public class RequestResponse
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string District { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public Guid? PetId { get; set; }
    public string? PetName { get; set; }
    public string Type { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Motivation { get; set; } = string.Empty;
    public string? Notes { get; set; }

    // Adopción
    public string? HouseType { get; set; }
    public bool? HasOtherPets { get; set; }
    public bool? HasChildren { get; set; }
    public bool? AcceptHomeVisit { get; set; }

    // Donación
    public decimal? DonationAmount { get; set; }
    public bool? MonthlyDonation { get; set; }
    public string? DonationMessage { get; set; }

    // Padrino
    public decimal? SponsorshipAmount { get; set; }
    public DateTime? SponsorshipStartDate { get; set; }

    // Voluntariado
    public Guid? VolunteerAreaId { get; set; }
    public string? VolunteerAreaName { get; set; }
    public string? Experience { get; set; }
    public int? AvailableHoursPerWeek { get; set; }

    // Revisión
    public DateTime? ReviewedAt { get; set; }
    public Guid? ReviewedBy { get; set; }
    public string? ReviewerName { get; set; }
    public string? ReviewComment { get; set; }
    public DateTime CreatedAt { get; set; }
}