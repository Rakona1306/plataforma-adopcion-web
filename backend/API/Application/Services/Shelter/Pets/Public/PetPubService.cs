using System.Text.RegularExpressions;
using API.Application.Features.Shelter.Breeds.Dtos;
using API.Application.Features.Shelter.PetPhotos.Dtos;
using API.Application.Features.Shelter.Pets.Dtos.Public;
using API.Application.Features.Shelter.Species.Dtos.Public;
using API.Application.Features.Shelter.Traits.Dtos;
using API.Application.Features.Shelter.Vaccines.Dtos;
using API.Application.Features.System.Enums.Dto;
using API.Domain.Common.Model;
using API.Domain.Model.Enums;
using API.Domain.Model.Shelter;
using API.Domain.Repository.Shelter;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Shelter.Pets.Public
{
    public interface IPetPubService
    {
        Task<Paginate<PetPubResponse>> GetPaginate(PetPubFilterDto filter);
        Task<PetPubResponse?> GetBySlug(string slug);
        Task<List<PetPubResponse>> GetRecommendations(PetRecommendationsFilterDto filter);
    }

    public class PetPubService : IPetPubService
    {
        private readonly IPetRepository _repository;

        public PetPubService(IPetRepository repository)
        {
            _repository = repository;
        }

        public async Task<Paginate<PetPubResponse>> GetPaginate(PetPubFilterDto filter)
        {
            // 1. Inicializar Query base
            var query = _repository.Query();

            // 2. Aplicar los filtros anatómicos condicionales
            query = ApplyFilters(query, filter);

            // Aplicar ordenamiento
            query = ApplySort(query, filter.Sort);

            query = query.Where(x => !x.IsAdopted);

            // 3. 🔥 CORRECCIÓN: Contar DESPUÉS de aplicar filtros, no antes
            var totalCount = await query.CountAsync();

            // 4. Cargar relaciones necesarias de manera eficiente y paginar
            var items = await ApplyIncludes(query)
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .AsNoTracking()
                .ToListAsync();

            // 5. Mapear la proyección final limpiamente utilizando expresiones de colección [...]
            var mappedItems = items.Select(x => new PetPubResponse
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                RescueStory = x.RescueStory,
                BirthDate = x.BirthDate,
                WeightKg = x.WeightKg,
                Age = x.Age,
                Slug = x.Slug ?? SlugParser(x.Name),
                IsVaccinated = x.IsVaccinated,
                IsSterilized = x.IsSterilized,
                IsAdopted = x.IsAdopted,

                Gender = new EnumResponse { Key = (int)x.Gender, Value = x.Gender.ToString() },
                Size = new EnumResponse { Key = (int)x.Size, Value = x.Size.ToString() },
                Status = new EnumResponse { Key = (int)x.Status, Value = x.Status.ToString() },

                Specie = new SpeciePubResponse { Id = x.Species.Id, Name = x.Species.Name },
                Breeds = x.PetBreeds.Select(b => new OptionBreedResponse { Id = b.Id, Name = b.Breed.Name }).ToList(),
                Traits = x.PetTraits.Select(t => new OptionTraitResponse { Id = t.Id, Name = t.Trait.Name }).ToList(),
                PhotoUrls = x.Photos.Select(p => new OptionPetPhotoResponse { Id = p.Id, Url = p.Url }).ToList(),
                Vaccines = x.PetVaccines.Select(v => new VaccineRelationResponse { Id = v.Id, Name = v.Vaccine.Name }).ToList()
            }).ToList();

            return new Paginate<PetPubResponse>
            {
                Items = mappedItems,
                TotalCount = totalCount,
                Page = filter.Page,
                PageSize = filter.PageSize,
                TotalPages = filter.PageSize > 0
                    ? (totalCount + filter.PageSize - 1) / filter.PageSize
                    : 0
            };
        }

        public async Task<PetPubResponse?> GetBySlug(string slug)
        {
            var pet = await ApplyIncludes(_repository.Query())
                .FirstOrDefaultAsync(x => x.Slug == slug);

            if (pet is null)
                return null; // O lanzar excepción según tu lógica

            return MapToResponse(pet);
        }

        public async Task<List<PetPubResponse>> GetRecommendations(PetRecommendationsFilterDto filter)
        {
            var specieId = filter.ParseSpecieId();
            var breedIds = filter.ParseBreedIds();
            var traitIds = filter.ParseTraitIds();
            var notPetId = filter.ParsePetId();

            // 1. Inicializar Query base
            var query = _repository.Query();

            // 2. Excluir el pet que no debe mostrar
            if (notPetId.HasValue)
                query = query.Where(x => x.Id != notPetId.Value);

            // 3. Filtrar por SpecieId (primero)
            if (specieId.HasValue)
            {
                var specieResults = query.Where(x => x.SpeciesId == specieId.Value)
                    .OrderByDescending(x => x.IsRecommend);

                var specieItems = await ApplyIncludes(specieResults)
                    .Take(filter.PageSize)
                    .AsNoTracking()
                    .ToListAsync();

                return specieItems.Select(MapToResponse).ToList();
            }

            // 4. Si no hay resultados por SpecieId, filtrar por BreedIds
            if (breedIds.Length > 0)
            {
                var breedResults = query.Where(x => x.PetBreeds.Any(pb => breedIds.Contains(pb.BreedId)))
                    .OrderByDescending(x => x.IsRecommend);

                var breedItems = await ApplyIncludes(breedResults)
                    .Take(filter.PageSize)
                    .AsNoTracking()
                    .ToListAsync();

                return breedItems.Select(MapToResponse).ToList();
            }

            // 5. Si no hay resultados por BreedIds, filtrar por TraitIds
            if (traitIds.Length > 0)
            {
                var traitResults = query.Where(x => x.PetTraits.Any(pt => traitIds.Contains(pt.TraitId)))
                    .OrderByDescending(x => x.IsRecommend);

                var traitItems = await ApplyIncludes(traitResults)
                    .Take(filter.PageSize)
                    .AsNoTracking()
                    .ToListAsync();

                return traitItems.Select(MapToResponse).ToList();
            }

            // 6. Si no hay criterios específicos, devolver recomendados en general
            var recommendedItems = await ApplyIncludes(query.OrderByDescending(x => x.IsRecommend))
                .Take(filter.PageSize)
                .AsNoTracking()
                .ToListAsync();

            return recommendedItems.Select(MapToResponse).ToList();
        }

        /// <summary>
        /// Segmento Anatómico exclusivo para el motor de filtros dinámicos
        /// </summary>
        private static IQueryable<Pet> ApplyFilters(IQueryable<Pet> query, PetPubFilterDto filter)
        {
            if (filter.ParseGenders() is [_, ..] genders)
            {
                // Convertir integers a strings para comparar con enum en BD
                var genderStrings = genders.Select(g => ((PetGender)g).ToString()).ToList();
                query = query.Where(x => genderStrings.Contains(x.Gender.ToString()));
            }

            if (!string.IsNullOrWhiteSpace(filter.Search))
                query = query.Where(x => EF.Functions.ILike(x.Name, $"%{filter.Search}%"));

            if (filter.ParseSizes() is [_, ..] sizes)
            {
                var sizeStrings = sizes.Select(s => ((PetSize)s).ToString()).ToList();
                query = query.Where(x => sizeStrings.Contains(x.Size.ToString()));
            }

            if (filter.ParseSpeciesIds() is [_, ..] speciesIds)
                query = query.Where(x => speciesIds.Contains(x.SpeciesId));

            if (filter.ParseBreedIds() is [_, ..] breedIds)
                query = query.Where(x => x.PetBreeds.Any(pb => breedIds.Contains(pb.BreedId)));

            if (filter.MinAge.HasValue)
                query = query.Where(x => x.Age >= filter.MinAge.Value);

            if (filter.MaxAge.HasValue)
                query = query.Where(x => x.Age <= filter.MaxAge.Value);

            return query;
        }

        private PetPubResponse MapToResponse(Pet x)
        {
            return new PetPubResponse
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                RescueStory = x.RescueStory,
                BirthDate = x.BirthDate,
                WeightKg = x.WeightKg,
                Age = x.Age,
                Slug = x.Slug ?? SlugParser(x.Name),
                IsVaccinated = x.IsVaccinated,
                IsSterilized = x.IsSterilized,
                IsAdopted = x.IsAdopted,

                Gender = new EnumResponse { Key = (int)x.Gender, Value = x.Gender.ToString() },
                Size = new EnumResponse { Key = (int)x.Size, Value = x.Size.ToString() },
                Status = new EnumResponse { Key = (int)x.Status, Value = x.Status.ToString() },

                Specie = new SpeciePubResponse { Id = x.Species.Id, Name = x.Species.Name },
                Breeds = x.PetBreeds.Select(b => new OptionBreedResponse { Id = b.Id, Name = b.Breed.Name }).ToList(),
                Traits = x.PetTraits.Select(t => new OptionTraitResponse { Id = t.Id, Name = t.Trait.Name }).ToList(),
                PhotoUrls = x.Photos.Select(p => new OptionPetPhotoResponse { Id = p.Id, Url = p.Url }).ToList(),
                Vaccines = x.PetVaccines.Select(v => new VaccineRelationResponse { Id = v.Id, Name = v.Vaccine.Name }).ToList()
            };
        }

        private static IQueryable<Pet> ApplySort(IQueryable<Pet> query, string? sortBy)
        {
            if (string.IsNullOrWhiteSpace(sortBy))
                return query.OrderByDescending(x => x.IsRecommend); // Ordenamiento por defecto

            return sortBy?.ToLower().Trim() switch
            {
                "recommended" => query.OrderByDescending(x => x.IsRecommend),

                "name_asc" => query.OrderBy(x => x.Name),
                "name_desc" => query.OrderByDescending(x => x.Name),

                _ => query.OrderByDescending(x => x.IsRecommend)
            };
        }

        private static IQueryable<Pet> ApplyIncludes(IQueryable<Pet> query)
            => query.Include(x => x.PetBreeds).ThenInclude(pb => pb.Breed)
                    .Include(x => x.PetTraits).ThenInclude(pt => pt.Trait)
                    .Include(x => x.Photos)
                    .Include(x => x.Species)
                    .Include(x => x.PetVaccines).ThenInclude(pv => pv.Vaccine);

        private static string SlugParser(string name) =>
            Regex.Replace(name.ToLower().Trim(), @"[^\w\s-]", "")
                 .Replace(" ", "-")
                 .Replace("--", "-")
                 .TrimStart('-').TrimEnd('-');
    }
}