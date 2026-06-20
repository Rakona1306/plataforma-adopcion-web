using API.Domain.Model.Enums;

namespace API.Application.Features.Bussiness.Requests.Dtos;

public class ProcessReviewDto
{
    public RequestStatus Status { get; set; }
    public string? ReviewComment { get; set; }
}