using API.Application.Common.Services;
using API.Application.Features.Bussiness.AdoptionDetails.Dtos;
using API.Application.Features.Bussiness.Requests.Dtos;

namespace API.Application.Services.Bussiness.AdoptionDetails
{
    public interface IAdoptionDetailsPubService : IBaseService<RequestResponse, CreateReqAdoptionDetail, UpdateReqAdoptionDetail, AdoptionDetailFilterDto, RequestResponse>
    {
        public Task<RequestResponse> ReviewAsync(
            Guid id,
            ReviewAdoptionRequest dto,
            Guid reviewerId
        );
    }
}
