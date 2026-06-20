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
        private readonly PetMapper _mapper;

        public PetService(IPetRepository petRepository, PetMapper mapper, AuditLogMapper auditLogMapper)
            : base(petRepository, auditLogMapper)
        {
            _petRepository = petRepository;
            _mapper = mapper;
        }

        // --- GET ALL ---
        public async Task<Paginate<PetResponse>> GetAllAsync(PetFilterDto filter)
        {
            IQueryable<Pet> query = _petRepository.Query()
                .Include(x => x.Species)
                .Include(x => x.PetBreeds).ThenInclude(x => x.Breed)
                .Include(x => x.PetTraits).ThenInclude(x => x.Trait)
                .Include(x => x.Photos);

            if (!string.IsNullOrWhiteSpace(filter.Search))
                query = query.Where(x => x.Name.Contains(filter.Search));

            var totalCount = await query.CountAsync();
            var items = await query.Skip((filter.Page - 1) * filter.PageSize)
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

        // --- GET BY ID ---
        public async Task<PetResponse> GetByIdAsync(Guid id)
        {
            var pet = await GetPetWithRelationsAsync(id);
            return _mapper.ToResponse(pet);
        }

        // --- CREATE ---
        public async Task<PetResponse> CreateAsync(CreatePetDto dto, Guid? userId = null)
        {
            var entity = _mapper.ToEntity(dto);

            // Asignación inicial de relaciones
            entity.PetBreeds = dto.BreedIds.Select(id => new PetBreed { BreedId = id }).ToList();
            entity.PetTraits = dto.TraitIds.Select(id => new PetTrait { TraitId = id }).ToList();

            await _petRepository.CreateAsync(entity, userId);
            await _petRepository.SaveChangesAsync();

            return await GetByIdAsync(entity.Id);
        }

        // --- UPDATE (Delta Sync) ---
        public async Task<PetResponse> UpdateAsync(Guid id, UpdatePetDto dto, Guid? userId = null)
        {
            var pet = await GetPetWithRelationsAsync(id);

            _mapper.Update(dto, pet);

            // Delta Sync: Solo cambiamos lo que realmente se modificó
            SyncCollection(pet.PetBreeds, dto.Breeds, id => new PetBreed { PetId = id, BreedId = id });
            SyncCollection(pet.PetTraits, dto.Traits, id => new PetTrait { PetId = id, TraitId = id });

            await _petRepository.UpdateAsync(pet, userId);
            await _petRepository.SaveChangesAsync();

            return await GetByIdAsync(id);
        }

        // --- DELETE ---
        public async Task DeleteAsync(Guid id, Guid? userId = null)
        {
            var pet = await _petRepository.GetByIdAsync(id) ?? throw new Exception("Pet not found");
            await _petRepository.DeleteAsync(pet, userId);
            await _petRepository.SaveChangesAsync();
        }

        // --- HELPERS PRIVADOS ---
        private async Task<Pet> GetPetWithRelationsAsync(Guid id)
        {
            return await _petRepository.Query()
                .Include(x => x.Species)
                .Include(x => x.Photos)
                .Include(x => x.PetBreeds).ThenInclude(x => x.Breed)
                .Include(x => x.PetTraits).ThenInclude(x => x.Trait)
                .FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception("Pet not found");
        }

        private void SyncCollection<TEntity>(ICollection<TEntity> collection, UpdatePetRelationDto dto, Func<Guid, TEntity> factory)
            where TEntity : class
        {
            foreach (var id in dto.RemoveIds)
            {
                var item = collection.FirstOrDefault(x => EF.Property<Guid>(x, "BreedId") == id || EF.Property<Guid>(x, "TraitId") == id);
                if (item != null) collection.Remove(item);
            }
            foreach (var id in dto.AddIds.Where(id => !collection.Any(x => (EF.Property<Guid>(x, "BreedId") == id || EF.Property<Guid>(x, "TraitId") == id))))
                collection.Add(factory(id));
        }
    }
}
