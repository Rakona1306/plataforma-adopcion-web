using API.Application.Common.Services;
using API.Application.Features.Shelter.Breeds.Dtos;
using API.Application.Features.Shelter.Breeds.Mappers;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Application.Helpers;
using API.Domain.Common.Model;
using API.Domain.Model.Shelter;
using API.Domain.Repository.Shelter;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Shelter.Breeds
{
    public class BreedService
    : BaseService<
        Breed,
        IBreedRepository>,
      IBreedService
    {
        private readonly IBreedRepository
            _repository;

        private readonly ISpeciesRepository
            _speciesRepository;

        private readonly BreedMapper
            _mapper;

        public BreedService(
            IBreedRepository repository,
            ISpeciesRepository speciesRepository,
            BreedMapper mapper,
            AuditLogMapper auditLogMapper
        )
            : base(
                repository,
                auditLogMapper
            )
        {
            _repository = repository;

            _speciesRepository =
                speciesRepository;

            _mapper = mapper;
        }

        public async Task<
            Paginate<BreedResponse>
        > GetAllAsync(
            BreedFilterDto filter
        )
        {
            IQueryable<Breed> query =
                _repository.Query()
                    .Include(x => x.Species);

            if (!string.IsNullOrWhiteSpace(
                filter.Search
            ))
            {
                query = query.Where(x => EF.Functions.ILike(x.Name, $"%{filter.Search}%"));
            }

            if (filter.SpeciesId.HasValue)
            {
                query = query.Where(x =>
                    x.SpeciesId == filter.SpeciesId
                );
            }

            var total =
                await query.CountAsync();

            var items = await query
                .OrderByDescending(x =>
                    x.CreatedAt
                )
                .Skip(
                    (filter.Page - 1)
                    * filter.PageSize
                )
                .Take(filter.PageSize)
                .ToListAsync();

            return new Paginate<BreedResponse>
            {
                Items =
                    _mapper.ToResponseList(
                        items
                    ),

                TotalCount = total,

                Page = filter.Page,

                PageSize =
                    filter.PageSize
            };
        }

        public async Task<BreedResponse?>
            GetByIdAsync(Guid id)
        {
            var entity =
                await _repository.Query()
                    .Include(x => x.Species)
                    .FirstOrDefaultAsync(x =>
                        x.Id == id
                    );

            if (entity is null)
            {
                throw new Exception(
                    "La raza no fue encontrada"
                );
            }

            return _mapper.ToResponse(entity);
        }

        public async Task<BreedResponse>
            CreateAsync(
                CreateBreedDto dto,
                Guid? userId = null
            )
        {
            var speciesExists =
                await _speciesRepository
                    .ExistsAsync(x =>
                        x.Id == dto.SpeciesId
                    );

            if (!speciesExists)
            {
                throw new Exception(
                    "La especie no fue encontrada"
                );
            }

            var exists =
                await _repository.ExistsAsync(x =>
                    x.Name.ToLower() ==
                    dto.Name.ToLower()
                );

            if (exists)
            {
                throw new Exception(
                    "La raza ya existe"
                );
            }

            var entity =
                _mapper.ToEntity(dto);

            AuditHelper.CreateAudit(
                entity,
                userId
            );

            await _repository.CreateAsync(
                entity,
                userId
            );
            await _repository.SaveChangesAsync();


            return _mapper.ToResponse(entity);
        }

        public async Task<BreedResponse>
            UpdateAsync(
                Guid id,
                UpdateBreedDto dto,
                Guid? userId = null
            )
        {
            var entity =
                await _repository.GetByIdAsync(id);

            if (entity is null)
            {
                throw new Exception(
                    "La raza no fue encontrada"
                );
            }

            var speciesExists =
                await _speciesRepository
                    .ExistsAsync(x =>
                        x.Id == dto.SpeciesId
                    );

            if (!speciesExists)
            {
                throw new Exception(
                    "La especie no fue encontrada"
                );
            }

            var oldValues = new
            {
                entity.Name,
                entity.SpeciesId
            };

            _mapper.Update(dto, entity);

            AuditHelper.UpdateAudit(
                entity,
                userId
            );

            await _repository.UpdateAsync(
                entity,
                userId,
                oldValues
            );

            await _repository.SaveChangesAsync();

            return _mapper.ToResponse(entity);
        }

        public async Task DeleteAsync(
            Guid id,
            Guid? userId = null
        )
        {
            var entity =
                await _repository.GetByIdAsync(id);

            if (entity is null)
            {
                throw new Exception(
                    "La raza no fue encontrada"
                );
            }

            await _repository.DeleteAsync(
                entity,
                userId
            );

            await _repository.SaveChangesAsync();
        }
    }
}
