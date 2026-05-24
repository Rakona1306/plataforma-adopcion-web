using API.Domain.Model.Enums;

namespace API.Application.Features.Bussiness.Donations.Dtos;

public class DonationResponse
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DonationType Type { get; set; }
    public DonationStatus Status { get; set; }
    public string Currency { get; set; } = "PEN";
    public string? TransactionId { get; set; }
    public string? PaymentProvider { get; set; }
    public string? Message { get; set; }
    public DateTime DonationDate { get; set; }
    public bool IsMonthly { get; set; }
    public DateTime CreatedAt { get; set; }
}