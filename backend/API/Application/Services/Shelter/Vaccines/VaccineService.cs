using API.Application.Common.Services;
using API.Application.Features.Shelter.Vaccines.Dtos;
using API.Application.Features.Shelter.Vaccines.Mappers;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Application.Helpers;
using API.Domain.Common.Model;
using API.Domain.Model.Shelter;
using API.Domain.Repository.Shelter;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Shelter.Vaccines
{
    public class VaccineService
    : BaseService<
        Vaccine,
        IVaccineRepository>,
      IVaccineService
    {
        private readonly IVaccineRepository
            _repository;

        private readonly VaccineMapper
            _mapper;

        public VaccineService(
            IVaccineRepository repository,
            VaccineMapper mapper,
            AuditLogMapper auditLogMapper
        )
            : base(
                repository,
                auditLogMapper
            )
        {
            _repository = repository;

            _mapper = mapper;
        }

        public async Task<
            Paginate<VaccineResponse>
        > GetAllAsync(
            VaccineFilterDto filter
        )
        {
            IQueryable<Vaccine> query =
                _repository.Query();

            if (!string.IsNullOrWhiteSpace(
                filter.Search
            ))
            {
                query = query.Where(x =>
                    x.Name.Contains(
                        filter.Search
                    )
                );
            }

            var total =
                await query.CountAsync();

            var items = await query
                .OrderBy(x => x.Name)
                .Skip(
                    (filter.Page - 1)
                    * filter.PageSize
                )
                .Take(filter.PageSize)
                .ToListAsync();

            return new Paginate<VaccineResponse>
            {
                Items =
                    _mapper.ToResponseList(items),

                TotalCount = total,

                Page = filter.Page,

                PageSize = filter.PageSize
            };
        }

        public async Task<
            VaccineResponse?
        > GetByIdAsync(Guid id)
        {
            var entity =
                await _repository.GetByIdAsync(id);

            if (entity is null)
            {
                throw new Exception(
                    "La vacuna no fue encontrada"
                );
            }

            return _mapper.ToResponse(entity);
        }

        public async Task<
            VaccineResponse
        > CreateAsync(
            CreateVaccineDto dto,
            Guid? userId = null
        )
        {
            var exists =
                await _repository.ExistsAsync(x =>
                    x.Name.ToLower()
                    ==
                    dto.Name.ToLower()
                );

            if (exists)
            {
                throw new Exception(
                    "Ya existe una vacuna con ese nombre"
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

        public async Task<
            VaccineResponse
        > UpdateAsync(
            Guid id,
            UpdateVaccineDto dto,
            Guid? userId = null
        )
        {
            var entity =
                await _repository.GetByIdAsync(id);

            if (entity is null)
            {
                throw new Exception(
                    "La vacuna no fue encontrada"
                );
            }

            var exists =
                await _repository.ExistsAsync(x =>
                    x.Name.ToLower()
                        ==
                    dto.Name.ToLower()
                    &&
                    x.Id != id
                );

            if (exists)
            {
                throw new Exception(
                    "Ya existe una vacuna con ese nombre"
                );
            }

            var oldValues = new
            {
                entity.Name
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
                    "La vacuna no fue encontrada"
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
