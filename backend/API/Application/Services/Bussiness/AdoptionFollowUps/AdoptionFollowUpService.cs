using API.Application.Features.Bussiness.AdoptionFollowUps.Dtos;
using API.Application.Features.Bussiness.AdoptionFollowUps.Dtos.Private;
using API.Domain.Common.Model;
using API.Domain.Model.Bussiness;
using API.Domain.Repository.Bussiness;
using API.Infrastructure.Exceptions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Bussiness.AdoptionFollowUps
{
    public interface IAdoptionFollowUpService
    {
        Task<Paginate<AdoptionFollowUpResponse>> GetAllAsync(AdoptionFollowUpFilter filter);
        Task<AdoptionFollowUpResponse?> GetByIdAsync(int id);
        Task<AdoptionFollowUpResponse> CreateAsync(CreateAdoptionFollowUp dto, Guid? userId);
        Task<AdoptionFollowUpResponse> UpdateAsync(UpdateAdoptionFollowUp dto, Guid? userId);
        Task DeleteAsync(int id, Guid? userId);
    }

    public class AdoptionFollowUpService : IAdoptionFollowUpService
    {
        private readonly IAdoptionFollowUpRepository _repository;
        private readonly IMapper _mapper;

        public AdoptionFollowUpService(
            IAdoptionFollowUpRepository repository,
            IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Paginate<AdoptionFollowUpResponse>> GetAllAsync(AdoptionFollowUpFilter filter)
        {
            IQueryable<AdoptionFollowUp> query = _repository.Query();

            if (filter.AdoptionId.HasValue)
                query = query.Where(x => x.AdoptionId == filter.AdoptionId.Value);

            if (filter.DateFrom.HasValue)
                query = query.Where(x => x.FollowUpDate >= filter.DateFrom.Value);

            if (filter.DateTo.HasValue)
                query = query.Where(x => x.FollowUpDate <= filter.DateTo.Value);

            var totalCount = await query.CountAsync();

            var items = await query
                .OrderByDescending(x => x.FollowUpDate)
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ProjectTo<AdoptionFollowUpResponse>(_mapper.ConfigurationProvider)
                .ToListAsync();

            var totalPages = totalCount == 0
                ? 0
                : (int)Math.Ceiling(totalCount / (double)filter.PageSize);

            return new Paginate<AdoptionFollowUpResponse>
            {
                Items = items,
                TotalCount = totalCount,
                Page = filter.Page,
                PageSize = filter.PageSize,
                TotalPages = totalPages
            };
        }

        public async Task<AdoptionFollowUpResponse?> GetByIdAsync(int id)
        {
            var entity = await _repository
                .Query()
                .ProjectTo<AdoptionFollowUpResponse>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == id);

            return entity;
        }

        public async Task<AdoptionFollowUpResponse> CreateAsync(CreateAdoptionFollowUp dto, Guid? userId)
        {
            var entity = _mapper.Map<AdoptionFollowUp>(dto);

            await _repository.CreateAsync(entity, userId);
            await _repository.SaveChangesAsync();

            return _mapper.Map<AdoptionFollowUpResponse>(entity);
        }

        public async Task<AdoptionFollowUpResponse> UpdateAsync(UpdateAdoptionFollowUp dto, Guid? userId)
        {
            // OJO: Query() usa AsNoTracking(), por eso traemos la entidad con
            // FirstOrDefaultAsync directo del DbSet (con tracking) para poder
            // editarla, en vez de usar Query().
            var entity = await _repository.FirstOrDefaultAsync(x => x.Id == dto.Id)
                ?? throw new NotFoundException($"No se encontró el seguimiento con Id {dto.Id}");

            _mapper.Map(dto, entity);

            await _repository.UpdateAsync(entity, userId);
            await _repository.SaveChangesAsync();

            return _mapper.Map<AdoptionFollowUpResponse>(entity);
        }

        public async Task DeleteAsync(int id, Guid? userId)
        {
            var entity = await _repository.FirstOrDefaultAsync(x => x.Id == id)
                ?? throw new NotFoundException($"No se encontró el seguimiento con Id {id}");

            await _repository.DeleteAsync(entity, userId);
            await _repository.SaveChangesAsync();
        }
    }
}