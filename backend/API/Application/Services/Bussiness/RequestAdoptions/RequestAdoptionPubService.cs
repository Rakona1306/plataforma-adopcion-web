using API.Application.Features.Bussiness.RequestAdoptions.Dtos;
using API.Application.Features.Bussiness.RequestAdoptions.Dtos.Public;
using API.Domain.Common.Model;
using API.Domain.Model.Bussiness;
using API.Domain.Model.Enums;
using API.Domain.Repository.Bussiness;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Bussiness.RequestAdoptions
{
    public interface IRequestAdoptionPubService
    {
        Task Create(CreatePubRequestAdoption dto, Guid userId);
        Task<Paginate<RequestAdoptionPubResponse>> Paginate(RequestAdoptionPubFilter filter, Guid userId);
    }
    public class RequestAdoptionPubService : IRequestAdoptionPubService
    {
        private readonly IRequestAdoptionRepository _requestAdoptionRepository;
        private readonly IMapper _mapper;

        public RequestAdoptionPubService(
            IRequestAdoptionRepository requestAdoptionRepository,
            IMapper mapper)
        {
            _requestAdoptionRepository = requestAdoptionRepository;
            _mapper = mapper;
        }
        public async Task Create(CreatePubRequestAdoption dto, Guid userId)
        {
            // Verificar que la mascota existe y está disponible
            var existingRequest = await _requestAdoptionRepository
                .Query()
                .AnyAsync(r => r.UserId == userId && r.PetId == dto.PetId && r.Status == RequestStatus.PENDIENTE);

            if (existingRequest)
            {
                throw new InvalidOperationException(
                    "Ya tienes una solicitud pendiente para esta mascota.");
            }

            var requestAdoption = _mapper.Map<RequestAdoption>(dto);
            requestAdoption.UserId = userId;
            requestAdoption.Status = RequestStatus.PENDIENTE;
            requestAdoption.CreatedAt = DateTime.UtcNow;
            requestAdoption.CreatedBy = userId;
            requestAdoption.LastUpdatedAt = DateTime.UtcNow;
            requestAdoption.PlatformProvider = PlatformProvider.Web;

            await _requestAdoptionRepository.CreateAsync(requestAdoption, userId);
            await _requestAdoptionRepository.SaveChangesAsync();
        }

        public async Task<Paginate<RequestAdoptionPubResponse>> Paginate(RequestAdoptionPubFilter filter, Guid userId)
        {
            IQueryable<RequestAdoption> query = _requestAdoptionRepository.Query();

            query = query.Where(x => x.UserId == userId);

            if (filter.Status.HasValue)
                query = query.Where(x => x.Status == filter.Status.Value);

            // Contar total
            int totalItems = await query.CountAsync();

            // Ordenar
            query = filter.OrderBy?.ToLower() switch
            {
                "status" => filter.IsDescending ? query.OrderByDescending(x => x.Status) : query.OrderBy(x => x.Status),
                "district" => filter.IsDescending ? query.OrderByDescending(x => x.District) : query.OrderBy(x => x.District),
                "reviewedat" => filter.IsDescending ? query.OrderByDescending(x => x.ReviewedAt) : query.OrderBy(x => x.ReviewedAt),
                _ => filter.IsDescending ? query.OrderByDescending(x => x.CreatedAt) : query.OrderBy(x => x.CreatedAt)
            };

            // Paginar y proyectar
            var items = await query
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ProjectTo<RequestAdoptionPubResponse>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return new Paginate<RequestAdoptionPubResponse>
            {
                Items = items,
                TotalCount = totalItems,
                Page = filter.Page,
                PageSize = filter.PageSize
            };
        }
    }
}