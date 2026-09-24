using API.Application.Features.Shelter.Breeds.Dtos.Public;
using API.Domain.Common.Model;
using API.Domain.Model.Shelter;
using API.Domain.Repository.Shelter;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Shelter.Breeds.Public
{
    public interface IBreedPubService
    {
        Task<Paginate<BreedPubResponse>> GetAll(BreedPubFilterDto filter);
    }

    public class BreedPubService : IBreedPubService
    {
        private readonly IBreedRepository _repository;
        private readonly IMapper _mapper;

        public BreedPubService(
            IBreedRepository repository,
            IMapper mapper
        )
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Paginate<BreedPubResponse>> GetAll(BreedPubFilterDto filter)
        {
            IQueryable<Breed> query = _repository.Query();

            // --- Search ---
            if (!string.IsNullOrWhiteSpace(filter.Search))
            {
                query = query.Where(x =>
                    EF.Functions.ILike(x.Name, $"%{filter.Search}%")
                );
            }

            // --- SpecieId (uno o más separados por |) ---
            if (!string.IsNullOrWhiteSpace(filter.SpecieId))
            {
                var specieIds = filter.SpecieId
                    .Split('|', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                    .Select(id => Guid.TryParse(id, out var guid) ? guid : (Guid?)null)
                    .Where(id => id.HasValue)
                    .Select(id => id!.Value)
                    .ToList();

                if (specieIds.Count > 0)
                {
                    query = query.Where(x => specieIds.Contains(x.SpeciesId));
                }
            }

            // --- Sort (default: más recientes primero) ---
            query = filter.Sort switch
            {
                "name_asc" => query.OrderBy(x => x.Name),
                "name_desc" => query.OrderByDescending(x => x.Name),
                "createdAt_asc" => query.OrderBy(x => x.CreatedAt),
                _ => query.OrderByDescending(x => x.CreatedAt)
            };

            var total = await query.CountAsync();

            var items = await query
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ProjectTo<BreedPubResponse>(_mapper.ConfigurationProvider)
                .ToListAsync();

            var totalPages = total == 0
                ? 0
                : (int)Math.Ceiling(total / (double)filter.PageSize);

            return new Paginate<BreedPubResponse>
            {
                Items = items,
                TotalCount = total,
                Page = filter.Page,
                PageSize = filter.PageSize,
                TotalPages = totalPages
            };
        }
    }
}