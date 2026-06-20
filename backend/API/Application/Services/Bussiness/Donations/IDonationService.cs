using API.Application.Common.Services;
using API.Application.Features.Bussiness.Donations.Dtos;
using API.Domain.Model.Enums;

namespace API.Application.Services.Bussiness.Donations;

public interface IDonationService: IBaseService<DonationResponse, CreateDonationDto, UpdateDonationDto, DonationFilterDto>
{
    Task<DonationResponse> UpdateStatusAsync(Guid id, DonationStatus status, Guid? userId);
}