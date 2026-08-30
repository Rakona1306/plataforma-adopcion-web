using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;
using API.Application.Common.Services;
using API.Application.Features.Shelter.Pets.Dtos;
using API.Application.Features.Shelter.Pets.Dtos.Private;
using API.Application.Features.Shelter.Pets.Mappers;
using API.Application.Features.System.AuditLogs.Dtos;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Domain.Common.Model;
using API.Domain.Model.Shelter;
using API.Domain.Repository.Bussiness;
using API.Domain.Repository.Shelter;
using API.Infrastructure.Exceptions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Shelter.Pets
{
    public class PetService : BaseService<Pet, IPetRepository>, IPetService
    {
        private readonly IPetRepository _petRepository;
        private readonly PetMapper _mapper;
        private readonly IRequestAdoptionRepository _requestAdoptionRepository;
        private readonly IMapper _autoMapper;

        public PetService(
            IMapper autoMapper,
            IPetRepository petRepository,
            PetMapper mapper,
            AuditLogMapper auditLogMapper,
            IRequestAdoptionRepository requestAdoptionRepository
        )
            : base(petRepository, auditLogMapper)
        {
            _autoMapper = autoMapper;
            _petRepository = petRepository;
            _mapper = mapper;
            _requestAdoptionRepository = requestAdoptionRepository;
        }

        // --- GET ALL ---
        public async Task<Paginate<PetResponse>> GetAllAsync(PetFilterDto filter)
        {
            IQueryable<Pet> query = _petRepository.Query()
                .Include(x => x.Species)
                .Include(x => x.PetBreeds).ThenInclude(x => x.Breed)
                .Include(x => x.PetTraits).ThenInclude(x => x.Trait)
                .Include(x => x.PetVaccines).ThenInclude(x => x.Vaccine)
                .Include(x => x.Photos);

            if (!string.IsNullOrWhiteSpace(filter.Search))
                query = query.Where(x => x.Name.Contains(filter.Search));

            if (filter.IsAdopted.HasValue)
                query = query.Where(x => x.IsAdopted == filter.IsAdopted.Value);

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
        public async Task<PetResponse?> GetByIdAsync(Guid id)
        {
            var pet = await GetPetWithRelationsAsync(id);
            return _mapper.ToResponse(pet);
        }

        public async Task<PetResponse> CreateAsync(CreatePetDto dto, Guid? userId = null)
        {
            var entity = _mapper.ToEntity(dto);

            // Solo AddIds aplica en creación
            entity.PetBreeds = dto.BreedIds.AddIds
                .Select(id => new PetBreed { BreedId = id })
                .ToList();

            entity.PetTraits = dto.TraitIds.AddIds
                .Select(id => new PetTrait { TraitId = id })
                .ToList();

            entity.Slug = $"{GenerateSlug(entity.Name)}-{entity.Id}";

            await _petRepository.CreateAsync(entity, userId);
            await _petRepository.SaveChangesAsync();

            return await GetByIdAsync(entity.Id);
        }

        private static string GenerateSlug(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return string.Empty;

            text = text.ToLowerInvariant().Normalize(NormalizationForm.FormD);

            var sb = new StringBuilder();

            foreach (var c in text)
            {
                var category = CharUnicodeInfo.GetUnicodeCategory(c);

                if (category != UnicodeCategory.NonSpacingMark)
                    sb.Append(c);
            }

            text = sb.ToString().Normalize(NormalizationForm.FormC);

            text = Regex.Replace(text, @"[^a-z0-9\s-]", "");
            text = Regex.Replace(text, @"\s+", "-");
            text = Regex.Replace(text, @"-+", "-");

            return text.Trim('-');
        }
        public async Task<PetResponse> UpdateAsync(Guid id, UpdatePetDto dto, Guid? userId = null)
        {
            // Reemplaza GetByIdWithTrackingAsync con el query directo con relaciones
            var entity = await _petRepository.Query()
                .Include(x => x.PetBreeds)
                .Include(x => x.PetTraits)
                .FirstOrDefaultAsync(x => x.Id == id)
                ?? throw new NotFoundException("No encontrado");

            _mapper.Update(dto, entity);

            SyncBreeds(entity.PetBreeds, dto.BreedIds);
            SyncTraits(entity.PetTraits, dto.TraitIds);

            entity.Slug = $"{GenerateSlug(entity.Name)}-{entity.Id}";

            await _petRepository.UpdateAsync(entity, userId);
            await _petRepository.SaveChangesAsync();

            return await GetByIdAsync(entity.Id);
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
                .Include(x => x.PetVaccines).ThenInclude(x => x.Vaccine)
                .FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception("Pet not found");
        }

        private static void SyncBreeds(ICollection<PetBreed> collection, UpdatePetRelationDto dto)
        {
            var toRemove = collection
                .Where(x => dto.RemoveIds.Contains(x.BreedId))
                .ToList();

            foreach (var item in toRemove)
                collection.Remove(item);

            var existing = collection.Select(x => x.BreedId).ToHashSet();

            foreach (var id in dto.AddIds.Where(id => !existing.Contains(id)))
                collection.Add(new PetBreed { BreedId = id });
        }

        // Traits: usa addIds y removeIds explícitos
        private static void SyncTraits(ICollection<PetTrait> collection, UpdatePetRelationDto dto)
        {
            // Eliminar los indicados
            var toRemove = collection
                .Where(x => dto.RemoveIds.Contains(x.TraitId))
                .ToList();

            foreach (var item in toRemove)
                collection.Remove(item);

            // Agregar solo los que no existen ya
            var existing = collection.Select(x => x.TraitId).ToHashSet();

            foreach (var id in dto.AddIds.Where(id => !existing.Contains(id)))
                collection.Add(new PetTrait { TraitId = id });
        }


        public async Task<Paginate<PetResponse>> GetAllAdoptedAsync(PetFilterDto filter)
        {
            IQueryable<Pet> query = _petRepository.Query()
                .Include(x => x.Species)
                .Include(x => x.PetBreeds).ThenInclude(x => x.Breed)
                .Include(x => x.PetTraits).ThenInclude(x => x.Trait)
                .Include(x => x.PetVaccines).ThenInclude(x => x.Vaccine)
                .Include(x => x.Photos)
                .Where(x => x.IsAdopted);

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

        public async Task<Paginate<PetMostRequestedResponse>> GetMostRequestedAsync(PetFilterDto filter)
        {
            // Query base sin Include, para filtrar y contar (liviana)
            IQueryable<Pet> baseQuery = _petRepository.Query();

            if (!string.IsNullOrWhiteSpace(filter.Search))
                baseQuery = baseQuery.Where(x => x.Name.Contains(filter.Search));

            if (filter.IsAdopted.HasValue)
                baseQuery = baseQuery.Where(x => x.IsAdopted == filter.IsAdopted.Value);

            var requestAdoptionsQuery = _requestAdoptionRepository.Query();

            // PASO 1: solo Id + conteo, sin Include (acá el GroupBy es seguro)
            var groupedQuery =
                from pet in baseQuery
                join request in requestAdoptionsQuery
                    on pet.Id equals request.PetId
                group pet by pet.Id into g
                select new
                {
                    PetId = g.Key,
                    RequestCount = g.Count()
                };

            var totalCount = await groupedQuery.CountAsync();

            var pageOfCounts = await groupedQuery
                .OrderByDescending(x => x.RequestCount)
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            var petIds = pageOfCounts.Select(x => x.PetId).ToList();

            // PASO 2: traer esas mascotas puntuales CON sus Include (sin GroupBy, así no se pierden)
            var pets = await _petRepository.Query()
                .Include(x => x.Species)
                .Include(x => x.Photos)
                .Where(x => petIds.Contains(x.Id))
                .ToListAsync();

            // Reordenar según el orden por RequestCount (el Where con Contains no garantiza el orden)
            var petsById = pets.ToDictionary(x => x.Id);

            var items = pageOfCounts
                .Where(x => petsById.ContainsKey(x.PetId)) // salvaguarda por si alguna Pet fue borrada entre queries
                .Select(x =>
                {
                    var response = _autoMapper.Map<PetMostRequestedResponse>(petsById[x.PetId]);
                    response.RequestCount = x.RequestCount;
                    return response;
                })
                .ToList();

            return new Paginate<PetMostRequestedResponse>
            {
                Items = items,
                TotalCount = totalCount,
                Page = filter.Page,
                PageSize = filter.PageSize
            };
        }

        public Task<Paginate<AuditLogResponse>> GetInteractionsAsync(int page, int pageSize, Guid recordId)
        {
            throw new NotImplementedException();
        }
    }
}
