using API.Application.Common.Services;
using API.Application.Features.Bussiness.Requests.Dtos;
using API.Domain.Common.Model;

namespace API.Application.Services.Bussiness.Requests;

public interface IRequestService : IBaseService<RequestResponse, CreateRequestDto, UpdateRequestDto, RequestFilterDto>
{
    // Métodos paginados e independientes por cada tipo
    Task<Paginate<RequestResponse>> GetAdoptionsPagedAsync(RequestFilterDto filter);
    Task<Paginate<RequestResponse>> GetDonationsPagedAsync(RequestFilterDto filter);
    Task<Paginate<RequestResponse>> GetVolunteeringPagedAsync(RequestFilterDto filter);
    Task<Paginate<RequestResponse>> GetSponsorshipsPagedAsync(RequestFilterDto filter);

    // Rutas únicas de gestión de Reviews (Solo una vez)
    Task<RequestResponse> CreateReviewAsync(Guid id, ProcessReviewDto dto, Guid? reviewerId);
    Task<RequestResponse> UpdateReviewAsync(Guid id, ProcessReviewDto dto, Guid? reviewerId);
}