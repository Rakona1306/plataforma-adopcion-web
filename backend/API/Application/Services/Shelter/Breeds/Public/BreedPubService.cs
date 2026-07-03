using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Shelter.Breeds.Dtos.Public;
using API.Domain.Common.Model;
using API.Domain.Model.Shelter;
using API.Domain.Repository.Shelter;
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

        public BreedPubService(IBreedRepository repository)
        {
            _repository = repository;
        }

        public async Task<Paginate<BreedPubResponse>> GetAll(BreedPubFilterDto filter)
        {
            IQueryable<Breed> query = _repository.Query();

            if (!string.IsNullOrWhiteSpace(filter.Search))
            {
                query = query.Where(x => EF.Functions.ILike(x.Name, $"%{filter.Search}%"));
            }

            if (!string.IsNullOrWhiteSpace(filter.SpecieId))
            {
                var specieIds = filter.SpecieId
                    .Split(',', StringSplitOptions.RemoveEmptyEntries)
                    .Select(Guid.Parse)
                    .ToList();

                query = query.Where(x => specieIds.Contains(x.SpeciesId));
            }

            var total = await query.CountAsync();

            var items = query.Select(x => new BreedPubResponse()
            {
                Id = x.Id,
                Name = x.Name
            })
            .Skip((filter.Page - 1) * filter.PageSize)
            .Take(filter.PageSize);

            return new Paginate<BreedPubResponse>()
            {
                Items = items,
                Page = filter.Page,
                PageSize = filter.PageSize,
                TotalCount = total
            };
        }
    }
}