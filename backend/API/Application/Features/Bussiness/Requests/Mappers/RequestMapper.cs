using API.Application.Features.Bussiness.Requests.Dtos;
using API.Domain.Model.Bussiness;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Bussiness.Requests.Mappers;

[Mapper]
public partial class RequestMapper
{
    public partial Request ToEntity(CreateRequestDto dto);

    public partial void Update(UpdateRequestDto dto, [MappingTarget] Request entity);

    [MapProperty(nameof(Request.User.Name), nameof(RequestResponse.UserName))]
    [MapProperty(nameof(Request.Pet.Name), nameof(RequestResponse.PetName))]
    [MapProperty(nameof(Request.VolunteerArea.Name), nameof(RequestResponse.VolunteerAreaName))]
    [MapProperty(nameof(Request.Reviewer.Name), nameof(RequestResponse.ReviewerName))]
    public partial RequestResponse ToResponse(Request entity);

    public partial List<RequestResponse> ToResponseList(List<Request> entities);
}