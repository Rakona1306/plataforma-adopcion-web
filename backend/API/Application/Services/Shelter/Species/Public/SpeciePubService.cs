using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Shelter.Species.Dtos.Public;
using API.Domain.Repository.Shelter;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Shelter.Species.Public
{
    public interface ISpeciePubService
    {
        Task<List<SpeciePubResponse>> GetAll();
    }

    public class SpeciePubService : ISpeciePubService
    {
        private readonly ISpeciesRepository _repository;

        public SpeciePubService(ISpeciesRepository repository)
        {
            _repository = repository;
        }

        public Task<List<SpeciePubResponse>> GetAll()
        {
            return _repository.Query().Select(x => new SpeciePubResponse
            {
                Id = x.Id,
                Name = x.Name
            }).ToListAsync();
        }
    }
}