using API.Application.Features.Shelter.PetBreeds.Dtos;
using API.Application.Features.Shelter.PetBreeds.Mappers;
using API.Application.Features.System.AuditLogs.Dtos;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Domain.Common.Model;
using API.Domain.Model.Shelter;
using API.Domain.Repository.Shelter;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Shelter.PetBreedes
{
    public class PetBreedService
    : IPetBreedService
    {
        private readonly IPetBreedRepository
            _repository;

        private readonly IPetRepository
            _petRepository;

        private readonly IBreedRepository
            _breedRepository;

        private readonly PetBreedMapper
            _mapper;

        private readonly AuditLogMapper
            _auditLogMapper;

        public PetBreedService(
            IPetBreedRepository repository,
            IPetRepository petRepository,
            IBreedRepository breedRepository,
            PetBreedMapper mapper,
            AuditLogMapper auditLogMapper
        )
        {
            _repository = repository;

            _petRepository = petRepository;

            _breedRepository = breedRepository;

            _mapper = mapper;

            _auditLogMapper = auditLogMapper;
        }

        public async Task<
            Paginate<PetBreedResponse>
        > GetAllAsync(
            PetBreedFilterDto filter
        )
        {
            IQueryable<PetBreed> query =
                _repository.Query()
                    .Include(x => x.Pet)
                    .Include(x => x.Breed);

            if (filter.PetId.HasValue)
            {
                query = query.Where(x =>
                    x.PetId == filter.PetId
                );
            }

            if (filter.BreedId.HasValue)
            {
                query = query.Where(x =>
                    x.BreedId == filter.BreedId
                );
            }

            var total =
                await query.CountAsync();

            var items = await query
                .Skip(
                    (filter.Page - 1)
                    * filter.PageSize
                )
                .Take(filter.PageSize)
                .ToListAsync();

            return new Paginate<PetBreedResponse>
            {
                Items =
                    _mapper.ToResponseList(
                        items
                    ),

                TotalCount = total,

                Page = filter.Page,

                PageSize = filter.PageSize
            };
        }

        public async Task<
            PetBreedResponse?
        > GetByIdAsync(
            Guid petId,
            Guid breedId
        )
        {
            var entity =
                await _repository.Query()
                    .Include(x => x.Pet)
                    .Include(x => x.Breed)
                    .FirstOrDefaultAsync(x =>
                        x.PetId == petId
                        &&
                        x.BreedId == breedId
                    );

            if (entity is null)
            {
                throw new Exception(
                    "La relación mascota-raza no fue encontrada"
                );
            }

            return _mapper.ToResponse(entity);
        }

        public async Task<
            PetBreedResponse
        > CreateAsync(
            CreatePetBreedDto dto,
            Guid? userId = null
        )
        {
            var petExists =
                await _petRepository.ExistsAsync(
                    x => x.Id == dto.PetId
                );

            if (!petExists)
            {
                throw new Exception(
                    "La mascota no fue encontrada"
                );
            }

            var breedExists =
                await _breedRepository.ExistsAsync(
                    x => x.Id == dto.BreedId
                );

            if (!breedExists)
            {
                throw new Exception(
                    "La raza no fue encontrada"
                );
            }

            var exists =
                await _repository.ExistsAsync(x =>
                    x.PetId == dto.PetId
                    &&
                    x.BreedId == dto.BreedId
                );

            if (exists)
            {
                throw new Exception(
                    "La relación mascota-raza ya existe"
                );
            }

            var entity =
                _mapper.ToEntity(dto);

            await _repository.CreateAsync(
                entity,
                userId
            );

            await _repository.SaveChangesAsync();

            entity =
                await _repository.Query()
                    .Include(x => x.Pet)
                    .Include(x => x.Breed)
                    .FirstAsync(x =>
                        x.PetId == dto.PetId
                        &&
                        x.BreedId == dto.BreedId
                    );

            return _mapper.ToResponse(entity);
        }

        public async Task<
            PetBreedResponse
        > UpdateAsync(
            Guid petId,
            Guid breedId,
            UpdatePetBreedDto dto,
            Guid? userId = null
        )
        {
            var entity =
                await _repository.Query()
                    .FirstOrDefaultAsync(x =>
                        x.PetId == petId
                        &&
                        x.BreedId == breedId
                    );

            if (entity is null)
            {
                throw new Exception(
                    "La relación mascota-raza no fue encontrada"
                );
            }

            var oldValues = new
            {
                entity.Percentage
            };

            _mapper.Update(dto, entity);

            await _repository.UpdateAsync(
                entity,
                userId,
                oldValues
            );

            await _repository.SaveChangesAsync();

            entity =
                await _repository.Query()
                    .Include(x => x.Pet)
                    .Include(x => x.Breed)
                    .FirstAsync(x =>
                        x.PetId == entity.PetId
                        &&
                        x.BreedId == entity.BreedId
                    );

            return _mapper.ToResponse(entity);
        }

        public async Task DeleteAsync(
            Guid petId,
            Guid breedId,
            Guid? userId = null
        )
        {
            var entity =
                await _repository.Query()
                    .FirstOrDefaultAsync(x =>
                        x.PetId == petId
                        &&
                        x.BreedId == breedId
                    );

            if (entity is null)
            {
                throw new Exception(
                    "La relación mascota-raza no fue encontrada"
                );
            }

            await _repository.DeleteAsync(
                entity,
                userId
            );

            await _repository.SaveChangesAsync();
        }

        public async Task<
            Paginate<AuditLogResponse>
        > GetInteractionsAsync(
            int page,
            int pageSize,
            Guid recordId
        )
        {
            var interactions =
                await _repository
                    .GetInteractionsAsync(
                        page,
                        pageSize,
                        recordId
                    );

            return new Paginate<AuditLogResponse>
            {
                Items =
                    _auditLogMapper.ToResponseList(
                        interactions.Items.ToList()
                    ),

                TotalCount =
                    interactions.TotalCount,

                Page =
                    interactions.Page,

                PageSize =
                    interactions.PageSize
            };
        }
    }
}
