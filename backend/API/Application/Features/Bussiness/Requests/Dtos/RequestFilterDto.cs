using API.Domain.Model.Enums;

namespace API.Application.Features.Bussiness.Requests.Dtos;

public class RequestFilterDto
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public Guid? UserId { get; set; }
    public Guid? PetId { get; set; }
    public RequestStatus? Status { get; set; }
    public string? Search { get; set; }
}