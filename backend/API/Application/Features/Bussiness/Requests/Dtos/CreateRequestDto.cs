using API.Domain.Model.Enums;

namespace API.Application.Features.Bussiness.Requests.Dtos;

public class CreateRequestDto
{
    public Guid UserId { get; set; }
    public string District { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public Guid? PetId { get; set; }
    public RequestType Type { get; set; }
    public string Motivation { get; set; } = string.Empty;
    public string? Notes { get; set; }

    // Campos de Adopción
    public string? HouseType { get; set; }
    public bool? HasOtherPets { get; set; }
    public bool? HasChildren { get; set; }
    public bool? AcceptHomeVisit { get; set; }

    // Campos de Donación
    public decimal? DonationAmount { get; set; }
    public bool? MonthlyDonation { get; set; }
    public string? DonationMessage { get; set; }

    // Campos de Padrino
    public decimal? SponsorshipAmount { get; set; }
    public DateTime? SponsorshipStartDate { get; set; }

    // Campos de Voluntariado
    public Guid? VolunteerAreaId { get; set; }
    public string? Experience { get; set; }
    public int? AvailableHoursPerWeek { get; set; }
}