using API.Application.Common.Services;
using API.Application.Features.Shelter.Pets.Dtos;
using API.Application.Features.Shelter.Pets.Dtos.Private;
using API.Application.Features.System.AuditLogs.Dtos;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Domain.Common.Model;
using API.Domain.Model.Enums;
using API.Domain.Model.Shelter;
using API.Domain.Repository.Bussiness;
using API.Domain.Repository.Shelter;
using API.Infrastructure.Exceptions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace API.Application.Services.Shelter.Pets
{
    public class PetService : BaseService<Pet, IPetRepository>, IPetService
    {
        private readonly IPetRepository _petRepository;
        private readonly IRequestAdoptionRepository _requestAdoptionRepository;
        private readonly IMapper _mapper;

        public PetService(
            IMapper mapper,
            IPetRepository petRepository,
            AuditLogMapper auditLogMapper,
            IRequestAdoptionRepository requestAdoptionRepository
        ) : base(petRepository, auditLogMapper)
        {
            _mapper = mapper;
            _petRepository = petRepository;
            _requestAdoptionRepository = requestAdoptionRepository;
        }

        // --- GET ALL ---
        public async Task<Paginate<PetResponse>> GetAllAsync(PetFilterDto filter)
        {
            IQueryable<Pet> query = _petRepository.Query();

            // 1. Aplicar Filtros
            query = ApplyFilters(query, filter);

            // 2. Contar total ANTES de paginar
            var totalCount = await query.CountAsync();

            // 3. Aplicar Ordenamiento
            query = ApplySort(query, filter.Sort);

            // 4. Paginar y Proyectar a Response (SQL Optimizado)
            var items = await query
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ProjectTo<PetResponse>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return new Paginate<PetResponse>
            {
                Items = items,
                TotalCount = totalCount,
                Page = filter.Page,
                PageSize = filter.PageSize,
                TotalPages = totalCount == 0 ? 0 : (int)Math.Ceiling(totalCount / (double)filter.PageSize)
            };
        }

        // --- FILTROS (reutilizable) ---
        // Los strings de filtro (Gender, SpecieId, Size, BreedId) aceptan varios valores
        // separados por '|' y se combinan con OR dentro de cada campo.
        private static IQueryable<Pet> ApplyFilters(IQueryable<Pet> query, PetFilterDto filter)
        {
            if (!string.IsNullOrWhiteSpace(filter.Search))
                query = query.Where(x => x.Name.Contains(filter.Search));

            if (filter.IsAdopted.HasValue)
                query = query.Where(x => x.IsAdopted == filter.IsAdopted.Value);

            if (filter.IsVaccinated.HasValue)
                query = query.Where(x => x.IsVaccinated == filter.IsVaccinated.Value);

            if (filter.IsSterilized.HasValue)
                query = query.Where(x => x.IsSterilized == filter.IsSterilized.Value);

            if (filter.MinAge.HasValue)
                query = query.Where(x => x.Age >= filter.MinAge.Value);

            if (filter.MaxAge.HasValue)
                query = query.Where(x => x.Age <= filter.MaxAge.Value);

            if (!string.IsNullOrWhiteSpace(filter.Gender))
            {
                var genders = filter.Gender
                    .Split('|', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                    .Select(g => Enum.TryParse<PetGender>(g, true, out var parsed) ? parsed : (PetGender?)null)
                    .Where(g => g.HasValue)
                    .Select(g => g!.Value)
                    .ToList();

                if (genders.Count > 0)
                    query = query.Where(x => genders.Contains(x.Gender));
            }

            if (!string.IsNullOrWhiteSpace(filter.Size))
            {
                var sizes = filter.Size
                    .Split('|', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                    .Select(s => Enum.TryParse<PetSize>(s, true, out var parsed) ? parsed : (PetSize?)null)
                    .Where(s => s.HasValue)
                    .Select(s => s!.Value)
                    .ToList();

                if (sizes.Count > 0)
                    query = query.Where(x => sizes.Contains(x.Size));
            }

            if (!string.IsNullOrWhiteSpace(filter.SpecieId))
            {
                var specieIds = filter.SpecieId
                    .Split('|', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                    .Select(id => Guid.TryParse(id, out var guid) ? guid : (Guid?)null)
                    .Where(id => id.HasValue)
                    .Select(id => id!.Value)
                    .ToList();

                if (specieIds.Count > 0)
                    query = query.Where(x => specieIds.Contains(x.SpeciesId));
            }

            if (!string.IsNullOrWhiteSpace(filter.BreedId))
            {
                var breedIds = filter.BreedId
                    .Split('|', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                    .Select(id => Guid.TryParse(id, out var guid) ? guid : (Guid?)null)
                    .Where(id => id.HasValue)
                    .Select(id => id!.Value)
                    .ToList();

                if (breedIds.Count > 0)
                    query = query.Where(x => x.PetBreeds.Any(pb => breedIds.Contains(pb.BreedId)));
            }

            return query;
        }

        // --- SORT (reutilizable) ---
        // Formato esperado: campos separados por '|', cada uno opcionalmente
        // prefijado con '-' para orden descendente. Ej: "Name|-Age" => ordena por
        // Name asc y luego por Age desc. Sin Sort -> primero los que cumplen años
        // hoy (BirthDate con mismo mes/día que hoy), luego CreatedAt desc.
        private static IQueryable<Pet> ApplySort(IQueryable<Pet> query, string? sort)
        {
            if (string.IsNullOrWhiteSpace(sort))
                return DefaultOrder(query);

            var fields = sort.Split('|', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

            IOrderedQueryable<Pet>? ordered = null;

            foreach (var field in fields)
            {
                var descending = field.StartsWith('-');
                var key = (descending ? field[1..] : field).Trim();

                ordered = key.ToLowerInvariant() switch
                {
                    "name" => ordered is null
                        ? (descending ? query.OrderByDescending(x => x.Name) : query.OrderBy(x => x.Name))
                        : (descending ? ordered.ThenByDescending(x => x.Name) : ordered.ThenBy(x => x.Name)),

                    "age" => ordered is null
                        ? (descending ? query.OrderByDescending(x => x.Age) : query.OrderBy(x => x.Age))
                        : (descending ? ordered.ThenByDescending(x => x.Age) : ordered.ThenBy(x => x.Age)),

                    "weightkg" => ordered is null
                        ? (descending ? query.OrderByDescending(x => x.WeightKg) : query.OrderBy(x => x.WeightKg))
                        : (descending ? ordered.ThenByDescending(x => x.WeightKg) : ordered.ThenBy(x => x.WeightKg)),

                    "birthdate" => ordered is null
                        ? (descending ? query.OrderByDescending(x => x.BirthDate) : query.OrderBy(x => x.BirthDate))
                        : (descending ? ordered.ThenByDescending(x => x.BirthDate) : ordered.ThenBy(x => x.BirthDate)),

                    "createdat" => ordered is null
                        ? (descending ? query.OrderByDescending(x => x.CreatedAt) : query.OrderBy(x => x.CreatedAt))
                        : (descending ? ordered.ThenByDescending(x => x.CreatedAt) : ordered.ThenBy(x => x.CreatedAt)),

                    "isadopted" => ordered is null
                        ? (descending ? query.OrderByDescending(x => x.IsAdopted) : query.OrderBy(x => x.IsAdopted))
                        : (descending ? ordered.ThenByDescending(x => x.IsAdopted) : ordered.ThenBy(x => x.IsAdopted)),

                    "isvaccinated" => ordered is null
                        ? (descending ? query.OrderByDescending(x => x.IsVaccinated) : query.OrderBy(x => x.IsVaccinated))
                        : (descending ? ordered.ThenByDescending(x => x.IsVaccinated) : ordered.ThenBy(x => x.IsVaccinated)),

                    "issterilized" => ordered is null
                        ? (descending ? query.OrderByDescending(x => x.IsSterilized) : query.OrderBy(x => x.IsSterilized))
                        : (descending ? ordered.ThenByDescending(x => x.IsSterilized) : ordered.ThenBy(x => x.IsSterilized)),

                    "gender" => ordered is null
                        ? (descending ? query.OrderByDescending(x => x.Gender) : query.OrderBy(x => x.Gender))
                        : (descending ? ordered.ThenByDescending(x => x.Gender) : ordered.ThenBy(x => x.Gender)),

                    "size" => ordered is null
                        ? (descending ? query.OrderByDescending(x => x.Size) : query.OrderBy(x => x.Size))
                        : (descending ? ordered.ThenByDescending(x => x.Size) : ordered.ThenBy(x => x.Size)),

                    "status" => ordered is null
                        ? (descending ? query.OrderByDescending(x => x.Status) : query.OrderBy(x => x.Status))
                        : (descending ? ordered.ThenByDescending(x => x.Status) : ordered.ThenBy(x => x.Status)),

                    _ => ordered // clave no reconocida: se ignora
                };
            }

            return ordered ?? DefaultOrder(query);
        }

        // Orden por defecto cuando no hay Sort: cumpleañeros de hoy primero
        // (comparando solo mes/día del BirthDate contra la fecha actual),
        // luego los más recientes.
        private static IQueryable<Pet> DefaultOrder(IQueryable<Pet> query)
        {
            var todayMonth = DateTime.Today.Month;
            var todayDay = DateTime.Today.Day;

            return query
                .OrderByDescending(x =>
                    x.BirthDate.HasValue
                    && x.BirthDate.Value.Month == todayMonth
                    && x.BirthDate.Value.Day == todayDay)
                .ThenByDescending(x => x.CreatedAt);
        }

        // --- GET BY ID ---
        public async Task<PetResponse?> GetByIdAsync(Guid id)
        {
            // Usamos ProjectTo aquí también para evitar traer datos basura si no los necesitamos en el response
            var response = await _petRepository.Query()
                .Where(x => x.Id == id)
                .ProjectTo<PetResponse>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            if (response is null)
                throw new NotFoundException("Mascota no encontrada");

            return response;
        }

        public async Task<PetResponse> CreateAsync(CreatePetDto dto, Guid? userId = null)
        {
            var entity = _mapper.Map<Pet>(dto);

            // Inicializar colecciones vacías para evitar nulls
            entity.PetBreeds = new List<PetBreed>();
            entity.PetTraits = new List<PetTrait>();
            entity.Photos = new List<PetPhoto>();

            // Asignar relaciones iniciales
            if (dto.BreedIds?.AddIds != null && dto.BreedIds.AddIds.Any())
            {
                entity.PetBreeds = dto.BreedIds.AddIds.Select(id => new PetBreed { BreedId = id }).ToList();
            }

            if (dto.TraitIds?.AddIds != null && dto.TraitIds.AddIds.Any())
            {
                entity.PetTraits = dto.TraitIds.AddIds.Select(id => new PetTrait { TraitId = id }).ToList();
            }

            entity.Slug = $"{GenerateSlug(entity.Name)}-{entity.Id}"; // Nota: El ID puede ser temporal si es DB-generated, ajustar si es necesario

            await _petRepository.CreateAsync(entity, userId);
            await _petRepository.SaveChangesAsync();

            // Retornar el objeto completo creado
            return await GetByIdAsync(entity.Id);
        }

        private static string GenerateSlug(string text)
        {
            if (string.IsNullOrWhiteSpace(text)) return string.Empty;
            text = text.ToLowerInvariant().Normalize(NormalizationForm.FormD);
            var sb = new StringBuilder();
            foreach (var c in text)
            {
                var category = CharUnicodeInfo.GetUnicodeCategory(c);
                if (category != UnicodeCategory.NonSpacingMark) sb.Append(c);
            }
            text = sb.ToString().Normalize(NormalizationForm.FormC);
            text = Regex.Replace(text, @"[^a-z0-9\s-]", "");
            text = Regex.Replace(text, @"\s+", "-");
            text = Regex.Replace(text, @"-+", "-");
            return text.Trim('-');
        }

        public async Task<PetResponse> UpdateAsync(Guid id, UpdatePetDto dto, Guid? userId = null)
        {
            // Recuperamos la entidad con sus relaciones para poder sincronizarlas
            var entity = await _petRepository.Query()
                .Include(x => x.PetBreeds)
                .Include(x => x.PetTraits)
                .FirstOrDefaultAsync(x => x.Id == id)
                ?? throw new NotFoundException("Mascota no encontrada");

            // Mapeo de propiedades simples (Name, Age, etc.)
            _mapper.Map(dto, entity);

            // Sincronización manual de colecciones (Lógica original)
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
            var pet = await _petRepository.GetByIdAsync(id)
                ?? throw new NotFoundException("Mascota no encontrada");

            await _petRepository.DeleteAsync(pet, userId);
            await _petRepository.SaveChangesAsync();
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
            // 1. Query base filtrando solo por adoptados
            IQueryable<Pet> query = _petRepository.Query()
                .Where(x => x.IsAdopted);

            // 2. Aplicar filtros adicionales (búsqueda, edad, etc.)
            query = ApplyFilters(query, filter);

            // 3. Contar total ANTES de paginar
            var totalCount = await query.CountAsync();

            // 4. Aplicar ordenamiento
            query = ApplySort(query, filter.Sort);

            // 5. Paginar y Proyectar a Response (SQL Optimizado: solo trae lo necesario)
            var items = await query
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ProjectTo<PetResponse>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return new Paginate<PetResponse>
            {
                Items = items,
                TotalCount = totalCount,
                Page = filter.Page,
                PageSize = filter.PageSize,
                TotalPages = totalCount == 0 ? 0 : (int)Math.Ceiling(totalCount / (double)filter.PageSize)
            };
        }

        public async Task<Paginate<PetMostRequestedResponse>> GetMostRequestedAsync(PetFilterDto filter)
        {
            // 1. Query base para contar solicitudes
            var requestQuery = _requestAdoptionRepository.Query();

            // Agrupamos por PetId para obtener el conteo
            var groupedCounts = requestQuery
                .GroupBy(r => r.PetId)
                .Select(g => new { PetId = g.Key, Count = g.Count() })
                .OrderByDescending(x => x.Count);

            // Aplicar filtros básicos si es necesario (aunque usualmente "más solicitados" es global o por especie)
            // Si quieres filtrar por especie en los más solicitados, habría que hacer un Join complejo.
            // Por ahora asumimos que el filtro de búsqueda aplica sobre el nombre de la mascota después.

            var totalCount = await groupedCounts.CountAsync();

            // Paginamos los IDs y contadores primero (muy ligero)
            var pagedCounts = await groupedCounts
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            if (!pagedCounts.Any())
            {
                return new Paginate<PetMostRequestedResponse>
                {
                    Items = new List<PetMostRequestedResponse>(),
                    TotalCount = 0,
                    Page = filter.Page,
                    PageSize = filter.PageSize,
                    TotalPages = 0
                };
            }

            var petIds = pagedCounts.Select(x => x.PetId).ToList();

            // 2. Traemos los detalles de esas mascotas específicas usando ProjectTo
            var petsDetails = await _petRepository.Query()
                .Where(x => petIds.Contains(x.Id))
                .ProjectTo<PetMostRequestedResponse>(_mapper.ConfigurationProvider)
                .ToListAsync();

            // 3. Unimos los detalles con el conteo
            var countDict = pagedCounts.ToDictionary(k => k.PetId, v => v.Count);

            var items = petsDetails.Select(pet =>
            {
                pet.RequestCount = countDict.TryGetValue(pet.Id, out var count) ? count : 0;
                return pet;
            }).ToList();

            // Ordenamos nuevamente por RequestCount para asegurar el orden correcto tras el Where
            items = items.OrderByDescending(x => x.RequestCount).ToList();

            return new Paginate<PetMostRequestedResponse>
            {
                Items = items,
                TotalCount = totalCount,
                Page = filter.Page,
                PageSize = filter.PageSize,
                TotalPages = totalCount == 0 ? 0 : (int)Math.Ceiling(totalCount / (double)filter.PageSize)
            };
        }

        public Task<Paginate<AuditLogResponse>> GetInteractionsAsync(int page, int pageSize, Guid recordId)
        {
            throw new NotImplementedException();
        }
    }
}