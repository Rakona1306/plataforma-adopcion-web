using API.Domain.Model.Enums;

namespace API.Application.Features.Bussiness.Donations.Dtos;

public class UpdateDonationDto
{
    public DonationStatus Status { get; set; }
    public string? TransactionId { get; set; }
    public string? PaymentProvider { get; set; }
    public string? Message { get; set; }
}