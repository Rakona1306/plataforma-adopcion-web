using API.Application.Features.Bussiness.Adoptions.Dtos;
using API.Application.Features.Bussiness.Adoptions.Dtos.Private;
using API.Domain.Common.Model;
using API.Domain.Model.Bussiness;
using API.Domain.Repository.Bussiness;
using API.Domain.Repository.Shelter;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Bussiness.Adoptions
{
    public interface IAdoptionService
    {
        Task<Paginate<AdoptionResponse>> PaginateAsync(AdoptionFilter filter);
        Task UpdateStatusAsync(UpdateAdoptionStatus dto, Guid userId);
        Task<AdoptionResponse> GetByIdAsync(int id);
    }
    public class AdoptionService : IAdoptionService
    {
        private readonly IAdoptionRepository _adoptionRepository;
        private readonly IPetRepository _petRepository;
        private readonly IMapper _mapper;

        public AdoptionService(IAdoptionRepository adoptionRepository, IPetRepository petRepository, IMapper mapper)
        {
            _adoptionRepository = adoptionRepository;
            _petRepository = petRepository;
            _mapper = mapper;
        }

        public async Task UpdateStatusAsync(UpdateAdoptionStatus dto, Guid userId)
        {
            var adoption = await _adoptionRepository
                .Query()
                .Include(a => a.RequestAdoption)
                .FirstOrDefaultAsync(a => a.Id == dto.Id);

            if (adoption is null)
            {
                throw new KeyNotFoundException($"No se encontró la adopción con Id {dto.Id}");
            }

            var pet = await _petRepository.Query().FirstOrDefaultAsync(p => p.Id == adoption.RequestAdoption.PetId);
            if (pet is null)
            {
                throw new KeyNotFoundException($"No se encontró la mascota con Id {adoption.RequestAdoption.PetId}");
            }
            pet.IsAdopted = false;

            // Actualizar solo los campos permitidos
            adoption.Status = dto.Status;
            adoption.Observations = dto.Observations;

            // Auditoría
            adoption.LastUpdatedAt = DateTime.UtcNow;
            adoption.UpdatedBy = userId;

            await _adoptionRepository.UpdateAsync(adoption, userId);
            await _petRepository.UpdateAsync(pet, userId);

            await _petRepository.SaveChangesAsync();
            await _adoptionRepository.SaveChangesAsync();
        }

        public async Task<AdoptionResponse> GetByIdAsync(int id)
        {
            var adoption = await _adoptionRepository
                .Query()
                .Where(a => a.Id == id)
                .ProjectTo<AdoptionResponse>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            if (adoption is null)
            {
                throw new KeyNotFoundException($"No se encontró la adopción con Id {id}");
            }

            return adoption;
        }

        public async Task<Paginate<AdoptionResponse>> PaginateAsync(AdoptionFilter filter)
        {
            IQueryable<Adoption> query = _adoptionRepository.Query();

            // Incluir la relación para que ProjectTo pueda mapear Adop_RequestAdoptionResponse
            query = query.Include(a => a.RequestAdoption)
                         .ThenInclude(ra => ra.User)
                         .Include(a => a.RequestAdoption)
                         .ThenInclude(ra => ra.Pet);

            // Aplicar filtros
            if (filter.Status.HasValue)
            {
                query = query.Where(a => a.Status == filter.Status.Value);
            }

            if (filter.RequestAdoptionId.HasValue)
            {
                query = query.Where(a => a.RequestAdoptionId == filter.RequestAdoptionId.Value);
            }

            if (filter.UserId.HasValue)
            {
                query = query.Where(a => a.RequestAdoption.UserId == filter.UserId.Value);
            }

            if (filter.AdoptionDateFrom.HasValue)
            {
                query = query.Where(a => a.AdoptionDate >= filter.AdoptionDateFrom.Value);
            }

            if (filter.AdoptionDateTo.HasValue)
            {
                query = query.Where(a => a.AdoptionDate <= filter.AdoptionDateTo.Value);
            }

            // Contar total de registros antes de paginar
            int totalCount = await query.CountAsync();

            // Ordenamiento dinámico
            query = filter.OrderBy?.ToLower() switch
            {
                "adoptiondate" => filter.IsDescending
                    ? query.OrderByDescending(a => a.AdoptionDate)
                    : query.OrderBy(a => a.AdoptionDate),
                "status" => filter.IsDescending
                    ? query.OrderByDescending(a => a.Status)
                    : query.OrderBy(a => a.Status),
                _ => filter.IsDescending
                    ? query.OrderByDescending(a => a.CreatedAt)
                    : query.OrderBy(a => a.CreatedAt)
            };

            // Paginación y Proyección a DTO (ProjectTo traduce el mapeo a SQL)
            var items = await query
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ProjectTo<AdoptionResponse>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return new Paginate<AdoptionResponse>
            {
                Items = items,
                TotalCount = totalCount,
                Page = filter.Page,
                PageSize = filter.PageSize
            };
        }
    }
}