using API.Application.Common.Services;
using API.Application.Features.Shelter.MedicalRecords.Dtos;
using API.Application.Features.Shelter.MedicalRecords.Mappers;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Application.Helpers;
using API.Domain.Common.Model;
using API.Domain.Model.Shelter;
using API.Domain.Repository.Shelter;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Shelter.MedicalRecords
{
    public class MedicalRecordService
    : BaseService<
        MedicalRecord,
        IMedicalRecordRepository>,
      IMedicalRecordService
    {
        private readonly IMedicalRecordRepository
            _repository;

        private readonly IPetRepository
            _petRepository;

        private readonly MedicalRecordMapper
            _mapper;

        public MedicalRecordService(
            IMedicalRecordRepository repository,
            IPetRepository petRepository,
            MedicalRecordMapper mapper,
            AuditLogMapper auditLogMapper
        )
            : base(
                repository,
                auditLogMapper
            )
        {
            _repository = repository;
            _petRepository = petRepository;
            _mapper = mapper;
        }

        public async Task<
            Paginate<MedicalRecordResponse>
        > GetAllAsync(
            MedicalRecordFilterDto filter
        )
        {
            IQueryable<MedicalRecord> query =
                _repository.Query()
                    .Include(x => x.Pet);

            if (!string.IsNullOrWhiteSpace(
                filter.Search
            ))
            {
                query = query.Where(x =>
                    x.Diagnosis.Contains(filter.Search)
                );
            }

            if (filter.PetId.HasValue)
            {
                query = query.Where(x =>
                    x.PetId == filter.PetId
                );
            }

            if (filter.RequiresFollowUp.HasValue)
            {
                query = query.Where(x =>
                    x.RequiresFollowUp ==
                    filter.RequiresFollowUp
                );
            }

            var total =
                await query.CountAsync();

            var items = await query
                .OrderByDescending(x =>
                    x.VisitDate
                )
                .Skip(
                    (filter.Page - 1)
                    * filter.PageSize
                )
                .Take(filter.PageSize)
                .ToListAsync();

            return new Paginate<MedicalRecordResponse>
            {
                Items =
                    _mapper.ToResponseList(items),

                TotalCount = total,

                Page = filter.Page,

                PageSize = filter.PageSize
            };
        }

        public async Task<
            MedicalRecordResponse?
        > GetByIdAsync(Guid id)
        {
            var entity =
                await _repository.Query()
                    .Include(x => x.Pet)
                    .FirstOrDefaultAsync(x =>
                        x.Id == id
                    );

            if (entity is null)
            {
                throw new Exception(
                    "El historial médico no fue encontrado"
                );
            }

            return _mapper.ToResponse(entity);
        }

        public async Task<
            MedicalRecordResponse
        > CreateAsync(
            CreateMedicalRecordDto dto,
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

            entity =
                await _repository.Query()
                    .Include(x => x.Pet)
                    .FirstAsync(x =>
                        x.Id == entity.Id
                    );

            return _mapper.ToResponse(entity);
        }

        public async Task<
            MedicalRecordResponse
        > UpdateAsync(
            Guid id,
            UpdateMedicalRecordDto dto,
            Guid? userId = null
        )
        {
            var entity =
                await _repository.GetByIdAsync(id);

            if (entity is null)
            {
                throw new Exception(
                    "El historial médico no fue encontrado"
                );
            }

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

            var oldValues = new
            {
                entity.PetId,
                entity.VisitDate,
                entity.Diagnosis,
                entity.Treatment,
                entity.Notes,
                entity.RequiresFollowUp
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

            entity =
                await _repository.Query()
                    .Include(x => x.Pet)
                    .FirstAsync(x =>
                        x.Id == entity.Id
                    );

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
                    "El historial médico no fue encontrado"
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
