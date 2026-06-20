using API.Domain.Model.Enums;

namespace API.Application.Features.Bussiness.Donations.Dtos;

public class DonationFilterDto
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public Guid? UserId { get; set; }
    public DonationType? Type { get; set; }
    public DonationStatus? Status { get; set; }
    public string? Currency { get; set; }
}