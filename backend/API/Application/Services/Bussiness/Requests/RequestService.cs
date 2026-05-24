using API.Application.Common.Services;
using API.Application.Features.Bussiness.Requests.Dtos;
using API.Application.Features.Bussiness.Requests.Mappers;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Application.Helpers;
using API.Domain.Common.Model;
using API.Domain.Model.Bussiness;
using API.Domain.Model.Enums;
using API.Domain.Repository.Bussiness;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Bussiness.Requests;

public class RequestService : BaseService<Request, IRequestRepository>, IRequestService
{
    private readonly IRequestRepository _repository;
    private readonly RequestMapper _mapper;

    public RequestService(
        IRequestRepository repository,
        RequestMapper mapper,
        AuditLogMapper auditLogMapper
    ) : base(repository, auditLogMapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    // BASE GET ALL GENERAL
    public async Task<Paginate<RequestResponse>> GetAllAsync(RequestFilterDto filter)
    {
        var query = ApplyBaseFilters(_repository.Query(), filter);
        return await ExecutePaginationAsync(query, filter.Page, filter.PageSize);
    }

    // ========================================================
    // SERVICIOS PAGINADOS INDEPENDIENTES POR ENUM (TIPO)
    // ========================================================

    public async Task<Paginate<RequestResponse>> GetAdoptionsPagedAsync(RequestFilterDto filter)
    {
        var query = _repository.Query().Where(x => x.Type == RequestType.ADOPCION);
        query = ApplyBaseFilters(query, filter);
        return await ExecutePaginationAsync(query, filter.Page, filter.PageSize);
    }

    public async Task<Paginate<RequestResponse>> GetDonationsPagedAsync(RequestFilterDto filter)
    {
        var query = _repository.Query().Where(x => x.Type == RequestType.DONACION);
        query = ApplyBaseFilters(query, filter);
        return await ExecutePaginationAsync(query, filter.Page, filter.PageSize);
    }

    public async Task<Paginate<RequestResponse>> GetVolunteeringPagedAsync(RequestFilterDto filter)
    {
        var query = _repository.Query().Where(x => x.Type == RequestType.VOLUNTARIADO);
        query = ApplyBaseFilters(query, filter);
        return await ExecutePaginationAsync(query, filter.Page, filter.PageSize);
    }

    public async Task<Paginate<RequestResponse>> GetSponsorshipsPagedAsync(RequestFilterDto filter)
    {
        var query = _repository.Query().Where(x => x.Type == RequestType.PADRINO);
        query = ApplyBaseFilters(query, filter);
        return await ExecutePaginationAsync(query, filter.Page, filter.PageSize);
    }

    // CRUDS BASE
    public async Task<RequestResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity is null) throw new Exception("Request not found");
        return _mapper.ToResponse(entity);
    }

    public async Task<RequestResponse> CreateAsync(CreateRequestDto dto, Guid? userId)
    {
        var entity = _mapper.ToEntity(dto);
        entity.Status = RequestStatus.PENDIENTE; // Forzar estado base al crearse

        AuditHelper.CreateAudit(entity, userId);
        await _repository.CreateAsync(entity, userId);
        await _repository.SaveChangesAsync();

        return _mapper.ToResponse(entity);
    }

    public async Task<RequestResponse> UpdateAsync(Guid id, UpdateRequestDto dto, Guid? userId)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity is null) throw new Exception("Request not found");

        if (entity.Status != RequestStatus.PENDIENTE)
            throw new Exception("No puedes modificar una solicitud que ya ha sido procesada o revisada.");

        _mapper.Update(dto, entity);

        AuditHelper.UpdateAudit(entity, userId);
        await _repository.UpdateAsync(entity, userId);
        await _repository.SaveChangesAsync();

        return _mapper.ToResponse(entity);
    }

    public async Task DeleteAsync(Guid id, Guid? userId)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity is null) throw new Exception("Request not found");

        await _repository.DeleteAsync(entity, userId);
        await _repository.SaveChangesAsync();
    }

    // ========================================================
    // GESTIÓN DE REVIEWS (RUTAS SEPARADAS Y CONTROL ÚNICO)
    // ========================================================

    public async Task<RequestResponse> CreateReviewAsync(Guid id, ProcessReviewDto dto, Guid? reviewerId)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity is null) throw new Exception("Request not found");

        // VALIDACIÓN CLAVE: Que se pueda registrar la review SOLO UNA VEZ.
        if (entity.ReviewedAt.HasValue || entity.ReviewedBy.HasValue || entity.Status != RequestStatus.PENDIENTE)
        {
            throw new Exception("Esta solicitud ya ha sido revisada previamente. Use la ruta de actualización si es necesario.");
        }

        entity.Status = dto.Status;
        entity.ReviewComment = dto.ReviewComment;
        entity.ReviewedAt = DateTime.UtcNow;
        entity.ReviewedBy = reviewerId;

        AuditHelper.UpdateAudit(entity, reviewerId);
        await _repository.UpdateAsync(entity, reviewerId);
        await _repository.SaveChangesAsync();

        return _mapper.ToResponse(entity);
    }

    public async Task<RequestResponse> UpdateReviewAsync(Guid id, ProcessReviewDto dto, Guid? reviewerId)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity is null) throw new Exception("Request not found");

        // Validar que efectivamente ya exista una revisión previa para poder actualizarla
        if (!entity.ReviewedAt.HasValue)
        {
            throw new Exception("No existe una revisión previa que modificar en esta solicitud.");
        }

        entity.Status = dto.Status;
        entity.ReviewComment = dto.ReviewComment;
        entity.ReviewedAt = DateTime.UtcNow; // Actualizamos estampa de tiempo de revisión
        entity.ReviewedBy = reviewerId;

        AuditHelper.UpdateAudit(entity, reviewerId);
        await _repository.UpdateAsync(entity, reviewerId);
        await _repository.SaveChangesAsync();

        return _mapper.ToResponse(entity);
    }

    // HELPER METODOS INTERNOS
    private IQueryable<Request> ApplyBaseFilters(IQueryable<Request> query, RequestFilterDto filter)
    {
        if (filter.UserId.HasValue) query = query.Where(x => x.UserId == filter.UserId.Value);
        if (filter.PetId.HasValue) query = query.Where(x => x.PetId == filter.PetId.Value);
        if (filter.Status.HasValue) query = query.Where(x => x.Status == filter.Status.Value);
        if (!string.IsNullOrWhiteSpace(filter.Search))
        {
            query = query.Where(x => x.District.Contains(filter.Search) || x.Motivation.Contains(filter.Search));
        }
        return query;
    }

    private async Task<Paginate<RequestResponse>> ExecutePaginationAsync(IQueryable<Request> query, int page, int pageSize)
    {
        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new Paginate<RequestResponse>
        {
            Items = _mapper.ToResponseList(items),
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }
}