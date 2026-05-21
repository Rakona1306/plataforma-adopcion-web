using API.Application.Common.Services;
using API.Application.Features.Shelter.Pets.Dtos;
using API.Application.Features.Shelter.Pets.Mappers;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Domain.Common.Model;
using API.Domain.Model.Shelter;
using API.Domain.Repository.Shelter;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Shelter.Pets
{
    public class PetService : BaseService<Pet, IPetRepository>, IPetService
    {
        private readonly IPetRepository _petRepository;
        private readonly ISpeciesRepository _speciesRepository;
        private readonly IBreedRepository _breedRepository;
        private readonly ITraitRepository _traitRepository;
        private readonly PetMapper _mapper;

        public PetService(
            IPetRepository petRepository,
            ISpeciesRepository speciesRepository,
            IBreedRepository breedRepository,
            ITraitRepository traitRepository,
            PetMapper mapper,
            AuditLogMapper auditLogMapper
        ) : base(petRepository, auditLogMapper)
        {
            _petRepository = petRepository;
            _speciesRepository = speciesRepository;
            _breedRepository = breedRepository;
            _traitRepository = traitRepository;
            _mapper = mapper;
        }

        public async Task<Paginate<PetResponse>> GetAllAsync(
            PetFilterDto filter
        )
        {
            var query = _petRepository.Query()
                .Include(x => x.Species)
                .Include(x => x.Photos)
                .Include(x => x.PetBreeds)
                    .ThenInclude(x => x.Breed)
                .Include(x => x.PetTraits)
                    .ThenInclude(x => x.Trait)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(filter.Search))
            {
                query = query.Where(x =>
                    x.Name.Contains(filter.Search)
                );
            }

            if (filter.SpeciesId.HasValue)
            {
                query = query.Where(x =>
                    x.SpeciesId == filter.SpeciesId
                );
            }

            if (filter.Status.HasValue)
            {
                query = query.Where(x =>
                    x.Status == filter.Status
                );
            }

            var totalCount = await query.CountAsync();

            var items = await query
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            return new Paginate<PetResponse>
            {
                Items = _mapper.ToResponseList(items),
                TotalCount = totalCount,
                Page = filter.Page,
                PageSize = filter.PageSize
            };
        }

        public async Task<PetResponse?> GetByIdAsync(Guid id)
        {
            var pet = await _petRepository.Query()
                .Include(x => x.Species)
                .Include(x => x.Photos)
                .Include(x => x.PetBreeds)
                    .ThenInclude(x => x.Breed)
                .Include(x => x.PetTraits)
                    .ThenInclude(x => x.Trait)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (pet is null)
                throw new Exception("Pet not found");

            return _mapper.ToResponse(pet);
        }

        public async Task<PetResponse> CreateAsync(
            CreatePetDto dto,
            Guid? userId = null
        )
        {
            var entity = _mapper.ToEntity(dto);

            entity.PetBreeds = dto.BreedIds
                .Select(x => new PetBreed
                {
                    BreedId = x
                })
                .ToList();

            entity.PetTraits = dto.TraitIds
                .Select(x => new PetTrait
                {
                    TraitId = x
                })
                .ToList();

            await _petRepository.CreateAsync(entity, userId);

            await _petRepository.SaveChangesAsync();

            var created = await GetByIdAsync(entity.Id);

            return created!;
        }

        public async Task<PetResponse> UpdateAsync(
            Guid id,
            UpdatePetDto dto,
            Guid? userId = null
        )
        {
            var pet = await _petRepository.Query()
                .Include(x => x.PetBreeds)
                .Include(x => x.PetTraits)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (pet is null)
                throw new Exception("Pet not found");

            _mapper.Update(dto, pet);

            await _petRepository.UpdateAsync(pet, userId);

            await _petRepository.SaveChangesAsync();

            return (await GetByIdAsync(id))!;
        }

        public async Task DeleteAsync(
            Guid id,
            Guid? userId = null
        )
        {
            var pet = await _petRepository.GetByIdAsync(id);

            if (pet is null)
                throw new Exception("Pet not found");

            await _petRepository.DeleteAsync(pet, userId);

            await _petRepository.SaveChangesAsync();
        }


    }
}
