using API.Application.Common.Services;
using API.Application.Features.Shelter.PetVaccines.Dtos;
using API.Application.Features.Shelter.PetVaccines.Mappers;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Application.Helpers;
using API.Domain.Common.Model;
using API.Domain.Model.Shelter;
using API.Domain.Repository.Shelter;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Shelter.PetVaccines
{
    public class PetVaccineService
    : BaseService<
        PetVaccine,
        IPetVaccineRepository>,
      IPetVaccineService
    {
        private readonly IPetVaccineRepository
            _repository;

        private readonly IPetRepository
            _petRepository;

        private readonly IVaccineRepository
            _vaccineRepository;

        private readonly PetVaccineMapper
            _mapper;

        public PetVaccineService(
            IPetVaccineRepository repository,
            IPetRepository petRepository,
            IVaccineRepository vaccineRepository,
            PetVaccineMapper mapper,
            AuditLogMapper auditLogMapper
        )
            : base(
                repository,
                auditLogMapper
            )
        {
            _repository = repository;

            _petRepository = petRepository;

            _vaccineRepository = vaccineRepository;

            _mapper = mapper;
        }

        public async Task<
            Paginate<PetVaccineResponse>
        > GetAllAsync(
            PetVaccineFilterDto filter
        )
        {
            IQueryable<PetVaccine> query =
                _repository.Query()
                .Include(x => x.Vaccine);

            if (filter.PetId.HasValue)
            {
                query = query.Where(x =>
                    x.PetId == filter.PetId
                );
            }

            if (filter.VaccineId.HasValue)
            {
                query = query.Where(x =>
                    x.VaccineId == filter.VaccineId
                );
            }

            if (filter.Expired.HasValue)
            {
                if (filter.Expired.Value)
                {
                    query = query.Where(x =>
                        x.ExpirationDate.HasValue
                        &&
                        x.ExpirationDate.Value
                            < DateTime.UtcNow
                    );
                }
                else
                {
                    query = query.Where(x =>
                        !x.ExpirationDate.HasValue
                        ||
                        x.ExpirationDate.Value
                            >= DateTime.UtcNow
                    );
                }
            }

            var total =
                await query.CountAsync();

            var items = await query
                .OrderByDescending(x =>
                    x.AppliedDate
                )
                .Skip(
                    (filter.Page - 1)
                    * filter.PageSize
                )
                .Take(filter.PageSize)
                .ToListAsync();

            return new Paginate<PetVaccineResponse>
            {
                Items =
                    _mapper.ToResponseList(items),

                TotalCount = total,

                Page = filter.Page,

                PageSize = filter.PageSize
            };
        }

        public async Task<
            PetVaccineResponse?
        > GetByIdAsync(
            Guid petId,
            Guid vaccineId
        )
        {
            var entity =
                await _repository.Query()
                .Include(x => x.Vaccine)
                .FirstOrDefaultAsync(x =>
                    x.PetId == petId
                    &&
                    x.VaccineId == vaccineId
                );

            if (entity is null)
            {
                throw new Exception(
                    "La vacuna de la mascota no fue encontrada"
                );
            }

            return _mapper.ToResponse(entity);
        }

        public async Task<
            PetVaccineResponse
        > CreateAsync(
            CreatePetVaccineDto dto,
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

            var vaccineExists =
                await _vaccineRepository.ExistsAsync(x =>
                    x.Id == dto.VaccineId
                );

            if (!vaccineExists)
            {
                throw new Exception(
                    "La vacuna no fue encontrada"
                );
            }

            var exists =
                await _repository.ExistsAsync(x =>
                    x.PetId == dto.PetId
                    &&
                    x.VaccineId == dto.VaccineId
                );

            if (exists)
            {
                throw new Exception(
                    "La mascota ya tiene registrada esta vacuna"
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
                .Include(x => x.Vaccine)
                .FirstAsync(x =>
                    x.PetId == dto.PetId
                    &&
                    x.VaccineId == dto.VaccineId
                );

            return _mapper.ToResponse(created);
        }

        public async Task<
            PetVaccineResponse
        > UpdateAsync(
            Guid petId,
            Guid vaccineId,
            UpdatePetVaccineDto dto,
            Guid? userId = null
        )
        {
            var entity =
                await _repository.Query()
                .FirstOrDefaultAsync(x =>
                    x.PetId == petId
                    &&
                    x.VaccineId == vaccineId
                );

            if (entity is null)
            {
                throw new Exception(
                    "La vacuna de la mascota no fue encontrada"
                );
            }

            var oldValues = new
            {
                entity.VaccineId,
                entity.AppliedDate,
                entity.ExpirationDate
            };

            entity.VaccineId =
                dto.VaccineId;

            entity.AppliedDate =
                dto.AppliedDate;

            entity.ExpirationDate =
                dto.ExpirationDate;

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
                .Include(x => x.Vaccine)
                .FirstAsync(x =>
                    x.PetId == entity.PetId
                    &&
                    x.VaccineId == entity.VaccineId
                );

            return _mapper.ToResponse(updated);
        }

        public async Task DeleteAsync(
            Guid petId,
            Guid vaccineId,
            Guid? userId = null
        )
        {
            var entity =
                await _repository.Query()
                .FirstOrDefaultAsync(x =>
                    x.PetId == petId
                    &&
                    x.VaccineId == vaccineId
                );

            if (entity is null)
            {
                throw new Exception(
                    "La vacuna de la mascota no fue encontrada"
                );
            }

            await _repository.DeleteAsync(
                entity,
                userId
            );

            await _repository.SaveChangesAsync();
        }

        async Task<PetVaccineResponse?>
            IBaseService<
                PetVaccineResponse,
                CreatePetVaccineDto,
                UpdatePetVaccineDto,
                PetVaccineFilterDto
            >.GetByIdAsync(Guid id)
        {
            throw new NotImplementedException(
                "PetVaccine utiliza llave compuesta"
            );
        }

        async Task<PetVaccineResponse>
            IBaseService<
                PetVaccineResponse,
                CreatePetVaccineDto,
                UpdatePetVaccineDto,
                PetVaccineFilterDto
            >.UpdateAsync(
                Guid id,
                UpdatePetVaccineDto dto,
                Guid? userId
            )
        {
            throw new NotImplementedException(
                "PetVaccine utiliza llave compuesta"
            );
        }

        async Task IBaseService<
            PetVaccineResponse,
            CreatePetVaccineDto,
            UpdatePetVaccineDto,
            PetVaccineFilterDto
        >.DeleteAsync(
            Guid id,
            Guid? userId
        )
        {
            throw new NotImplementedException(
                "PetVaccine utiliza llave compuesta"
            );
        }
    }
}
