using API.Application.Common.Services;
using API.Application.Features.Shelter.PetTraits.Dtos;
using API.Application.Features.Shelter.PetTraits.Mappers;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Application.Helpers;
using API.Domain.Common.Model;
using API.Domain.Model.Shelter;
using API.Domain.Repository.Shelter;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Shelter.PetTraits
{
    public class PetTraitService
    : BaseService<
        PetTrait,
        IPetTraitRepository>,
      IPetTraitService
    {
        private readonly IPetTraitRepository
            _repository;

        private readonly IPetRepository
            _petRepository;

        private readonly ITraitRepository
            _traitRepository;

        private readonly PetTraitMapper
            _mapper;

        public PetTraitService(
            IPetTraitRepository repository,
            IPetRepository petRepository,
            ITraitRepository traitRepository,
            PetTraitMapper mapper,
            AuditLogMapper auditLogMapper
        )
            : base(
                repository,
                auditLogMapper
            )
        {
            _repository = repository;

            _petRepository = petRepository;

            _traitRepository = traitRepository;

            _mapper = mapper;
        }

        public async Task<
            Paginate<PetTraitResponse>
        > GetAllAsync(
            PetTraitFilterDto filter
        )
        {
            IQueryable<PetTrait> query =
                _repository.Query()
                .Include(x => x.Trait);

            if (filter.PetId.HasValue)
            {
                query = query.Where(x =>
                    x.PetId == filter.PetId
                );
            }

            if (filter.TraitId.HasValue)
            {
                query = query.Where(x =>
                    x.TraitId == filter.TraitId
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

            return new Paginate<PetTraitResponse>
            {
                Items =
                    _mapper.ToResponseList(items),

                TotalCount = total,

                Page = filter.Page,

                PageSize = filter.PageSize
            };
        }

        public async Task<
            PetTraitResponse?
        > GetByIdAsync(
            Guid petId,
            Guid traitId
        )
        {
            var entity =
                await _repository.Query()
                .Include(x => x.Trait)
                .FirstOrDefaultAsync(x =>
                    x.PetId == petId
                    &&
                    x.TraitId == traitId
                );

            if (entity is null)
            {
                throw new Exception(
                    "La relación mascota-rasgo no fue encontrada"
                );
            }

            return _mapper.ToResponse(entity);
        }

        public async Task<
            PetTraitResponse
        > CreateAsync(
            CreatePetTraitDto dto,
            Guid? userId = null
        )
        {
            var petExists =
                await _petRepository.ExistsAsync(x =>
                    x.Id == dto.PetId
                );

            if (!petExists)
            {
                throw new Exception(
                    "La mascota no fue encontrada"
                );
            }

            var traitExists =
                await _traitRepository.ExistsAsync(x =>
                    x.Id == dto.TraitId
                );

            if (!traitExists)
            {
                throw new Exception(
                    "El rasgo no fue encontrado"
                );
            }

            var exists =
                await _repository.ExistsAsync(x =>
                    x.PetId == dto.PetId
                    &&
                    x.TraitId == dto.TraitId
                );

            if (exists)
            {
                throw new Exception(
                    "La mascota ya tiene asignado este rasgo"
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

            var created =
                await _repository.Query()
                .Include(x => x.Trait)
                .FirstAsync(x =>
                    x.PetId == dto.PetId
                    &&
                    x.TraitId == dto.TraitId
                );

            return _mapper.ToResponse(created);
        }

        public async Task<
            PetTraitResponse
        > UpdateAsync(
            Guid petId,
            Guid traitId,
            UpdatePetTraitDto dto,
            Guid? userId = null
        )
        {
            var entity =
                await _repository.Query()
                .FirstOrDefaultAsync(x =>
                    x.PetId == petId
                    &&
                    x.TraitId == traitId
                );

            if (entity is null)
            {
                throw new Exception(
                    "La relación mascota-rasgo no fue encontrada"
                );
            }

            var exists =
                await _repository.ExistsAsync(x =>
                    x.PetId == petId
                    &&
                    x.TraitId == dto.TraitId
                );

            if (exists)
            {
                throw new Exception(
                    "La mascota ya tiene asignado este rasgo"
                );
            }

            var oldValues = new
            {
                entity.PetId,
                entity.TraitId
            };

            entity.TraitId = dto.TraitId;

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

            var updated =
                await _repository.Query()
                .Include(x => x.Trait)
                .FirstAsync(x =>
                    x.PetId == entity.PetId
                    &&
                    x.TraitId == entity.TraitId
                );

            return _mapper.ToResponse(updated);
        }

        public async Task DeleteAsync(
            Guid petId,
            Guid traitId,
            Guid? userId = null
        )
        {
            var entity =
                await _repository.Query()
                .FirstOrDefaultAsync(x =>
                    x.PetId == petId
                    &&
                    x.TraitId == traitId
                );

            if (entity is null)
            {
                throw new Exception(
                    "La relación mascota-rasgo no fue encontrada"
                );
            }

            await _repository.DeleteAsync(
                entity,
                userId
            );

            await _repository.SaveChangesAsync();
        }

        public async Task<PetTraitResponse?> GetByIdAsync(Guid id)
        {
            throw new NotImplementedException(
                "PetTrait utiliza llave compuesta"
            );
        }

        public async Task<PetTraitResponse> UpdateAsync(
                Guid id,
                UpdatePetTraitDto dto,
                Guid? userId
            )
        {
            throw new NotImplementedException(
                "PetTrait utiliza llave compuesta"
            );
        }

        public async Task DeleteAsync(
            Guid id,
            Guid? userId
        )
        {
            throw new NotImplementedException(
                "PetTrait utiliza llave compuesta"
            );
        }
    }
}
