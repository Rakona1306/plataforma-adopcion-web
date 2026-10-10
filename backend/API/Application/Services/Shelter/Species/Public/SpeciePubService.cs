using System;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Shelter.Species.Dtos.Public;
using API.Domain.Common.Model;
using API.Domain.Repository.Shelter;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Shelter.Species.Public
{
    public interface ISpeciePubService
    {
        Task<Paginate<SpeciePubResponse>> GetAllAsync(SpeciesPubFilterDto filter);
    }

    public class SpeciePubService : ISpeciePubService
    {
        private readonly ISpeciesRepository _repository;
        private readonly IMapper _mapper;

        public SpeciePubService(ISpeciesRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Paginate<SpeciePubResponse>> GetAllAsync(SpeciesPubFilterDto filter)
        {
            // Validación defensiva de paginación
            if (filter.Page < 1) filter.Page = 1;
            if (filter.PageSize < 1) filter.PageSize = 10;
            if (filter.PageSize > 50) filter.PageSize = 50; // Límite máximo opcional

            var query = _repository.Query();

            // Filtro de búsqueda por nombre si se provee
            if (!string.IsNullOrWhiteSpace(filter.Search))
            {
                var searchTerm = filter.Search.Trim().ToLower();
                query = query.Where(x => x.Name.ToLower().Contains(searchTerm));
            }

            // Ordenamiento por defecto: Creado recientemente primero (Descending)
            query = query.OrderByDescending(x => x.CreatedAt);

            var totalCount = await query.CountAsync();

            // Aplicación de ProjectTo y paginación en base de datos de forma eficiente
            var items = await query
                .ProjectTo<SpeciePubResponse>(_mapper.ConfigurationProvider)
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            return new Paginate<SpeciePubResponse>
            {
                Items = items,
                TotalCount = totalCount,
                Page = filter.Page,
                PageSize = filter.PageSize
            };
        }
    }
}