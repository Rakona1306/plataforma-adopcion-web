using API.Application.Features.Bussiness.AdoptionDetails.Dtos;
using API.Application.Features.Bussiness.AdoptionDetails.Mappers;
using API.Application.Features.Bussiness.Requests.Dtos;
using API.Application.Features.System.AuditLogs.Dtos;
using API.Domain.Common.Model;
using API.Domain.Model.Enums;
using API.Domain.Repository.Bussiness;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Bussiness.AdoptionDetails
{
    public class AdoptionDetailsPubService : IAdoptionDetailsPubService
    {
        private readonly IRequestRepository _repository;
        private readonly AdoptionDetailMapper _mapper;

        public AdoptionDetailsPubService(
            IRequestRepository repository,
            AdoptionDetailMapper mapper
        )
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Paginate<RequestResponse>> GetAllAsync(AdoptionDetailFilterDto filter)
        {
            var query = _repository.Query()
                .Include(x => x.AdoptionDetails)
                .Include(x => x.User)
                .Include(x => x.Pet)
                .Include(x => x.Reviewer)
                .Where(x => x.Type == RequestType.ADOPCION);

            if (filter.UserId.HasValue)
                query = query.Where(x => x.UserId == filter.UserId.Value);

            if (filter.PetId.HasValue)
                query = query.Where(x => x.PetId == filter.PetId.Value);

            if (filter.Status.HasValue)
                query = query.Where(x => x.Status == filter.Status.Value);

            if (!string.IsNullOrWhiteSpace(filter.Search))
                query = query.Where(x => x.District.Contains(filter.Search) || x.Motivation.Contains(filter.Search));

            var totalCount = await query.CountAsync();

            var items = await query
                .OrderBy(x => x.Status == RequestStatus.APROBADO)
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            return new Paginate<RequestResponse>
            {
                Items = _mapper.ToResponseList(items),
                TotalCount = totalCount,
                Page = filter.Page,
                PageSize = filter.PageSize
            };
        }

        public async Task<RequestResponse?> GetByIdAsync(Guid id)
        {
            var entity = await _repository.Query()
                .Include(x => x.AdoptionDetails)
                .Include(x => x.User)
                .Include(x => x.Pet)
                .Include(x => x.Reviewer)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (entity is null || entity.Type != RequestType.ADOPCION)
                throw new Exception("Solicitud de adopción no encontrada.");

            return _mapper.ToResponse(entity);
        }

        public async Task<RequestResponse> CreateAsync(CreateReqAdoptionDetail dto, Guid? userId = null)
        {
            var entity = _mapper.ToEntity(dto);
            entity.UserId = userId ?? entity.UserId;
            entity.Type = RequestType.ADOPCION;
            entity.Status = RequestStatus.PENDIENTE;

            await _repository.CreateAsync(entity, userId);
            await _repository.SaveChangesAsync();

            var created = await _repository.Query()
                .Include(x => x.AdoptionDetails)
                .Include(x => x.User)
                .Include(x => x.Pet)
                .Include(x => x.Reviewer)
                .FirstOrDefaultAsync(x => x.Id == entity.Id);

            return _mapper.ToResponse(created ?? entity);
        }

        public async Task<RequestResponse> UpdateAsync(Guid id, UpdateReqAdoptionDetail dto, Guid? userId = null)
        {
            var entity = await _repository.Query()
                .Include(x => x.AdoptionDetails)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (entity is null || entity.Type != RequestType.ADOPCION)
                throw new Exception("Solicitud de adopción no encontrada.");

            if (entity.Status != RequestStatus.PENDIENTE)
                throw new Exception("No puedes modificar una solicitud de adopción que ya ha sido procesada o revisada.");

            _mapper.Update(dto, entity);

            await _repository.UpdateAsync(entity, userId, entity);
            await _repository.SaveChangesAsync();

            var updated = await _repository.Query()
                .Include(x => x.AdoptionDetails)
                .Include(x => x.User)
                .Include(x => x.Pet)
                .Include(x => x.Reviewer)
                .FirstOrDefaultAsync(x => x.Id == entity.Id);

            return _mapper.ToResponse(updated ?? entity);
        }

        public async Task DeleteAsync(Guid id, Guid? userId = null)
        {
            var entity = await _repository.GetByIdAsync(id);

            if (entity is null || entity.Type != RequestType.ADOPCION)
                throw new Exception("Solicitud de adopción no encontrada o no válida.");

            await _repository.DeleteAsync(entity, userId);
            await _repository.SaveChangesAsync();
        }

        public async Task<RequestResponse> ReviewAsync(
            Guid id,
            ReviewAdoptionRequest dto,
            Guid reviewerId
        )
        {
            var entity = await _repository.Query()
                .Include(x => x.Pet)
                .Include(x => x.AdoptionDetails)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (entity is null || entity.Type != RequestType.ADOPCION)
                throw new Exception("Solicitud de adopción no encontrada.");

            if (entity.Status != RequestStatus.PENDIENTE &&
                entity.Status != RequestStatus.EN_REVISION)
                throw new Exception("Esta solicitud ya fue procesada.");

            entity.Status = dto.Status;
            entity.ReviewComment = dto.ReviewComment;
            entity.ReviewedBy = reviewerId;
            entity.ReviewedAt = DateTime.UtcNow;

            if (dto.Status == RequestStatus.APROBADO)
            {
                if (entity.Pet is null) throw new Exception("La solicitud no tiene una mascota asociada.");

                if (entity.Pet.IsAdopted)
                    throw new Exception("La mascota ya ha sido adoptada.");

                entity.Pet.IsAdopted = true;
            }

            await _repository.UpdateAsync(entity, reviewerId, new
            {
                entity.Id,
                entity.Status,
                entity.ReviewComment,
                entity.ReviewedBy,
                entity.ReviewedAt,
                entity.PetId
            });
            await _repository.SaveChangesAsync();

            var updated = await _repository.Query()
                .Include(x => x.AdoptionDetails)
                .Include(x => x.User)
                .Include(x => x.Pet)
                .Include(x => x.Reviewer)
                .FirstOrDefaultAsync(x => x.Id == id);

            return _mapper.ToResponse(updated!);
        }

        public Task<Paginate<AuditLogResponse>> GetInteractionsAsync(int page, int pageSize, Guid recordId)
        {
            throw new NotImplementedException();
        }
    }
}