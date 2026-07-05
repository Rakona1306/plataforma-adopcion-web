using API.Application.Features.Bussiness.AdoptionDetails.Dtos;
using API.Application.Features.Bussiness.AdoptionDetails.Dtos.Public;
using API.Application.Features.Bussiness.Requests.Dtos;
using API.Domain.Model.Bussiness;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Bussiness.AdoptionDetails.Mappers
{
    public class AdoptionDetailMapper
    {
        public Request ToEntity(CreateReqAdoptionDetail dto)
        {
            return new Request
            {
                Id = Guid.NewGuid(),
                PetId = dto.PetId,
                Motivation = dto.Motivation,
                District = dto.District,
                Phone = dto.Phone,
                Notes = dto.Notes,
                AdoptionDetails = new Domain.Model.Bussiness.AdoptionDetails
                {
                    Id = Guid.NewGuid(),
                    HouseType = dto.HouseType,
                    HasOtherPets = dto.HasOtherPets,
                    HasChildren = dto.HasChildren,
                    AcceptHomeVisit = dto.AcceptHomeVisit
                }
            };
        }

        public void Update(UpdateReqAdoptionDetail dto, Request entity)
        {
            if (dto.Motivation is not null) entity.Motivation = dto.Motivation;
            if (dto.District is not null) entity.District = dto.District;
            if (dto.Phone is not null) entity.Phone = dto.Phone;
            if (dto.Notes is not null) entity.Notes = dto.Notes;

            if (entity.AdoptionDetails is not null)
            {
                if (dto.HouseType is not null) entity.AdoptionDetails.HouseType = dto.HouseType;
                if (dto.HasOtherPets.HasValue) entity.AdoptionDetails.HasOtherPets = dto.HasOtherPets.Value;
                if (dto.HasChildren.HasValue) entity.AdoptionDetails.HasChildren = dto.HasChildren.Value;
                if (dto.AcceptHomeVisit.HasValue) entity.AdoptionDetails.AcceptHomeVisit = dto.AcceptHomeVisit.Value;
            }
        }

        public RequestResponse ToResponse(Request entity)
        {
            Console.WriteLine($"Mapping Request entity to RequestResponse: {entity}");
            return new RequestResponse
            {
                Id = entity.Id,
                UserId = entity.UserId,
                UserName = entity.User != null ? $"{entity.User.Name} {entity.User.LastName}".Trim() : string.Empty,
                Type = entity.Type.ToString(),
                Status = entity.Status.ToString(),
                Motivation = entity.Motivation,
                District = entity.District,
                Phone = entity.Phone,
                Notes = entity.Notes,
                PetId = entity.PetId,
                PetName = entity.Pet?.Name,

                // Adopción
                HouseType = entity.AdoptionDetails?.HouseType,
                HasOtherPets = entity.AdoptionDetails?.HasOtherPets,
                HasChildren = entity.AdoptionDetails?.HasChildren,
                AcceptHomeVisit = entity.AdoptionDetails?.AcceptHomeVisit,

                // Revisión
                CreatedAt = entity.CreatedAt,
                ReviewedAt = entity.ReviewedAt,
                ReviewedBy = entity.ReviewedBy,
                ReviewerName = entity.Reviewer != null ? $"{entity.Reviewer.Name} {entity.Reviewer.LastName}".Trim() : null,
                ReviewComment = entity.ReviewComment,
            };
        }

        public List<RequestResponse> ToResponseList(List<Request> entities)
        {
            return entities.Select(ToResponse).ToList();
        }
    }
}