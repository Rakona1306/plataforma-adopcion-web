using API.Application.Common.Services;
using API.Application.Features.Bussiness.Donations.Dtos;
using API.Application.Features.Bussiness.Donations.Mappers;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Application.Helpers;
using API.Domain.Common.Model;
using API.Domain.Model.Bussiness;
using API.Domain.Model.Enums;
using API.Domain.Repository.Bussiness;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Bussiness.Donations;

public class DonationService : BaseService<Donation, IDonationRepository>, IDonationService
{
    private readonly IDonationRepository _repository;
    private readonly DonationMapper _mapper;

    public DonationService(
        IDonationRepository repository,
        DonationMapper mapper,
        AuditLogMapper auditLogMapper
    ) : base(repository, auditLogMapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<Paginate<DonationResponse>> GetAllAsync(DonationFilterDto filter)
    {
        var query = _repository.Query();

        // Filtrados específicos de Donation basados en tu FilterDto
        if (filter.UserId.HasValue)
        {
            query = query.Where(x => x.UserId == filter.UserId.Value);
        }

        if (filter.Type.HasValue)
        {
            query = query.Where(x => x.Type == filter.Type.Value);
        }

        if (filter.Status.HasValue)
        {
            query = query.Where(x => x.Status == filter.Status.Value);
        }

        if (!string.IsNullOrWhiteSpace(filter.Currency))
        {
            query = query.Where(x => x.Currency.ToLower() == filter.Currency.ToLower());
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(x => x.CreatedAt)
            .Skip((filter.Page - 1) * filter.PageSize)
            .Take(filter.PageSize)
            .ToListAsync();

        return new Paginate<DonationResponse>
        {
            Items = _mapper.ToResponseList(items),
            TotalCount = totalCount,
            Page = filter.Page,
            PageSize = filter.PageSize
        };
    }

    public async Task<DonationResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);

        if (entity is null)
            throw new Exception("Donation not found");

        return _mapper.ToResponse(entity);
    }

    public async Task<DonationResponse> CreateAsync(CreateDonationDto dto, Guid? userId)
    {
        // Opcional: Validar si la transacción ya fue registrada previamente para evitar duplicados
        if (!string.IsNullOrWhiteSpace(dto.TransactionId))
        {
            var exists = await _repository.ExistsAsync(x => x.TransactionId == dto.TransactionId);
            if (exists)
                throw new Exception("Transaction ID already exists");
        }

        var entity = _mapper.ToEntity(dto);

        AuditHelper.CreateAudit(entity, userId);

        await _repository.CreateAsync(entity, userId);
        await _repository.SaveChangesAsync();

        return _mapper.ToResponse(entity);
    }

    public async Task<DonationResponse> UpdateAsync(Guid id, UpdateDonationDto dto, Guid? userId)
    {
        var entity = await _repository.GetByIdAsync(id);

        if (entity is null)
            throw new Exception("Donation not found");

        _mapper.Update(dto, entity);

        AuditHelper.UpdateAudit(entity, userId);

        await _repository.UpdateAsync(entity, userId);
        await _repository.SaveChangesAsync();

        return _mapper.ToResponse(entity);
    }

    public async Task DeleteAsync(Guid id, Guid? userId)
    {
        var entity = await _repository.GetByIdAsync(id);

        if (entity is null)
            throw new Exception("Donation not found");

        await _repository.DeleteAsync(entity, userId);
        await _repository.SaveChangesAsync();
    }

    // ==========================================
    // NUEVA FUNCIÓN: CAMBIAR ESTADO
    // ==========================================
    public async Task<DonationResponse> UpdateStatusAsync(Guid id, DonationStatus status, Guid? userId)
    {
        var entity = await _repository.GetByIdAsync(id);

        if (entity is null)
            throw new Exception("Donation not found");

        // Modificamos únicamente el enum de estado
        entity.Status = status;

        // Aplicamos auditoría correspondiente a la modificación
        AuditHelper.UpdateAudit(entity, userId);

        await _repository.UpdateAsync(entity, userId);
        await _repository.SaveChangesAsync();

        return _mapper.ToResponse(entity);
    }
}