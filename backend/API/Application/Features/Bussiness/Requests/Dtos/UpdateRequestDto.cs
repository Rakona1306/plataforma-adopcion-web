namespace API.Application.Features.Bussiness.Requests.Dtos;

public class UpdateRequestDto
{
    public string District { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Motivation { get; set; } = string.Empty;
    public string? Notes { get; set; }

    // Se permiten actualizar opcionalmente según el tipo original
    public string? HouseType { get; set; }
    public bool? HasOtherPets { get; set; }
    public bool? HasChildren { get; set; }
    public bool? AcceptHomeVisit { get; set; }
    public decimal? DonationAmount { get; set; }
    public bool? MonthlyDonation { get; set; }
    public string? DonationMessage { get; set; }
    public decimal? SponsorshipAmount { get; set; }
    public DateTime? SponsorshipStartDate { get; set; }
    public Guid? VolunteerAreaId { get; set; }
    public string? Experience { get; set; }
    public int? AvailableHoursPerWeek { get; set; }
}