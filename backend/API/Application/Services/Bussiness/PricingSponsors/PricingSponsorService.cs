using API.Application.Features.Bussiness.PricingSponsors.Dtos;
using API.Application.Features.Bussiness.PricingSponsors.Mappers;
using API.Domain.Common.Model;
using API.Domain.Model.Bussiness;
using API.Domain.Repository.Bussiness;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;

namespace API.Application.Services.Bussiness.PricingSponsors
{
    public interface IPricingSponsorService
    {
        Task Create(CreatePricingSponsor createPricingSponsor, Guid? userId = null);
        Task Update(UpdatePricingSponsor updatePricingSponsor, Guid? userId = null);
        Task<Paginate<PricingSponsorResponse>> Paginate(PricingSponsorFilter filter);
        Task Delete(int id, Guid? userId = null);
    }
    public class PricingSponsorService : IPricingSponsorService
    {
        private readonly IPricingSponsorRepository _pricingSponsor;
        private readonly IMapper _mapper;
        public PricingSponsorService(IPricingSponsorRepository pricingSponsor, IMapper mapper)
        {
            _pricingSponsor = pricingSponsor;
            _mapper = mapper;
        }

        public async Task Create(CreatePricingSponsor createPricingSponsor, Guid? userId = null)
        {
            PricingSponsor pricingSponsor = _mapper.Map<PricingSponsor>(createPricingSponsor);
            await _pricingSponsor.CreateAsync(pricingSponsor, userId);
            await _pricingSponsor.SaveChangesAsync();
        }

        public async Task<Paginate<PricingSponsorResponse>> Paginate(PricingSponsorFilter filter)
        {
            IQueryable<PricingSponsor> query = _pricingSponsor.Query();
            query = query.OrderByDescending(x => x.Id);

            int totalItems = await query.CountAsync();
            List<PricingSponsorResponse> items = await query
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ProjectTo<PricingSponsorResponse>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return new Paginate<PricingSponsorResponse>
            {
                Items = items,
                TotalCount = totalItems,
                Page = filter.Page,
                PageSize = filter.PageSize
            };
        }

        public async Task Update(UpdatePricingSponsor updatePricingSponsor, Guid? userId = null)
        {
            PricingSponsor? existingEntity = await _pricingSponsor
                .Query()
                .FirstOrDefaultAsync(x => x.Id == updatePricingSponsor.Id);

            if (existingEntity is null)
            {
                throw new KeyNotFoundException(
                    $"No se encontró el plan de patrocinio con Id {updatePricingSponsor.Id}");
            }

            _mapper.Map(updatePricingSponsor, existingEntity);

            // Actualizar campos de auditoría
            existingEntity.LastUpdatedAt = DateTime.UtcNow;
            existingEntity.UpdatedBy = userId;

            await _pricingSponsor.UpdateAsync(
                existingEntity,
                userId
            );

            // Guardar cambios
            await _pricingSponsor.SaveChangesAsync();
        }

        public async Task Delete(int id, Guid? userId = null)
        {
            PricingSponsor? existingEntity = await _pricingSponsor
                .Query()
                .FirstOrDefaultAsync(x => x.Id == id);

            if (existingEntity is null)
            {
                throw new KeyNotFoundException(
                    $"No se encontró el plan de patrocinio con Id {id}");
            }

            await _pricingSponsor.DeleteAsync(
                existingEntity,
                userId
            );

            await _pricingSponsor.SaveChangesAsync();
        }
    }
}