using API.Application.Common.Services;
using API.Application.Features.Shelter.Pets.Mappers;
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
    public partial class PetVaccineService
    : BaseService<
        PetVaccine,
        IPetVaccineRepository>,
      IPetVaccineService
    {
        private readonly IPetVaccineRepository _repository;
        private readonly IPetRepository _petRepository;
        private readonly IVaccineRepository _vaccineRepository;
        private readonly PetVaccineMapper _mapper;

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
                .Include(x => x.Vaccine)
                .Include(x => x.Pet);

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

        public async Task<PetVaccineNoRelationsResponse> CreateAsync(CreatePetVaccineDto dto, Guid? userId = null)
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

            var entity = _mapper.ToEntity(dto);

            if (entity.AppliedDate.Kind == DateTimeKind.Unspecified || entity.AppliedDate.Kind == DateTimeKind.Local)
            {
                entity.AppliedDate = DateTime.SpecifyKind(entity.AppliedDate, DateTimeKind.Utc);
            }

            if (entity.ExpirationDate.HasValue &&
               (entity.ExpirationDate.Value.Kind == DateTimeKind.Unspecified || entity.ExpirationDate.Value.Kind == DateTimeKind.Local))
            {
                entity.ExpirationDate = DateTime.SpecifyKind(entity.ExpirationDate.Value, DateTimeKind.Utc);
            }

            AuditHelper.CreateAudit(
                entity,
                userId
            );

            await _repository.CreateAsync(
                entity,
                userId
            );

            await _repository.SaveChangesAsync();


            return _mapper.ToResponseWithoutRelations(entity);
        }

        public async Task DeleteByPetIdAndVaccineIdAsync(
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

        public async Task<PetVaccineResponse?>
            GetByIdAsync(Guid id)
        {
            throw new NotImplementedException(
                "PetVaccine utiliza llave compuesta"
            );
        }

        public async Task<PetVaccineNoRelationsResponse> UpdateAsync(Guid id, UpdatePetVaccineDto dto, Guid? userId)
        {
            var entity = await _repository.Query()
                .FirstOrDefaultAsync(x => x.Id == id)
                ?? throw new Exception("El registro específico de la vacuna no fue encontrado");

            var petExists = await _petRepository.ExistsAsync(x => x.Id == dto.PetId);
            if (!petExists)
            {
                throw new Exception("La mascota no fue encontrada");
            }

            var vaccineExists = await _vaccineRepository.ExistsAsync(x => x.Id == dto.VaccineId);
            if (!vaccineExists)
            {
                throw new Exception("La vacuna no fue encontrada");
            }

            _mapper.Update(dto, entity);

            if (entity.AppliedDate.Kind == DateTimeKind.Unspecified || entity.AppliedDate.Kind == DateTimeKind.Local)
            {
                entity.AppliedDate = DateTime.SpecifyKind(entity.AppliedDate, DateTimeKind.Utc);
            }

            if (entity.ExpirationDate.HasValue &&
               (entity.ExpirationDate.Value.Kind == DateTimeKind.Unspecified || entity.ExpirationDate.Value.Kind == DateTimeKind.Local))
            {
                entity.ExpirationDate = DateTime.SpecifyKind(entity.ExpirationDate.Value, DateTimeKind.Utc);
            }


            AuditHelper.UpdateAudit(entity, userId);

            await _repository.UpdateAsync(entity, userId);
            await _repository.SaveChangesAsync();

            return _mapper.ToResponseWithoutRelations(entity);
        }

        public async Task DeleteAsync(Guid id, Guid? userId)
        {
            var petVaccine = await _repository.GetByIdAsync(id) ?? throw new Exception("Relacion Mascota con Vacuna no encontrada");
            await _repository.DeleteAsync(petVaccine, userId);
            await _repository.SaveChangesAsync();
        }
    }
}
