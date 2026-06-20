using API.Application.Common.Services;
using API.Application.Features.Shelter.Traits.Dtos;
using API.Application.Features.Shelter.Traits.Mappers;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Application.Helpers;
using API.Domain.Common.Model;
using API.Domain.Model.Shelter;
using API.Domain.Repository.Shelter;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Shelter.Traits
{
    public class TraitService
    : BaseService<
        Trait,
        ITraitRepository>,
      ITraitService
    {
        private readonly ITraitRepository
            _repository;

        private readonly TraitMapper
            _mapper;

        public TraitService(
            ITraitRepository repository,
            TraitMapper mapper,
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
            Paginate<TraitResponse>
        > GetAllAsync(
            TraitFilterDto filter
        )
        {
            IQueryable<Trait> query =
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
                .OrderByDescending(x =>
                    x.CreatedAt
                )
                .Skip(
                    (filter.Page - 1)
                    * filter.PageSize
                )
                .Take(filter.PageSize)
                .ToListAsync();

            return new Paginate<TraitResponse>
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

        public async Task<TraitResponse?>
            GetByIdAsync(Guid id)
        {
            var entity =
                await _repository.Query()
                    .FirstOrDefaultAsync(x =>
                        x.Id == id
                    );

            if (entity is null)
            {
                throw new Exception(
                    "La característica no fue encontrada"
                );
            }

            return _mapper.ToResponse(entity);
        }

        public async Task<TraitResponse>
            CreateAsync(
                CreateTraitDto dto,
                Guid? userId = null
            )
        {

            var exists =
                await _repository.ExistsAsync(x =>
                    x.Name.ToLower() ==
                    dto.Name.ToLower()
                );

            if (exists)
            {
                throw new Exception(
                    "La característica ya existe"
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

        public async Task<TraitResponse>
            UpdateAsync(
                Guid id,
                UpdateTraitDto dto,
                Guid? userId = null
            )
        {
            var entity =
                await _repository.GetByIdAsync(id);

            if (entity is null)
            {
                throw new Exception(
                    "La característica no fue encontrada"
                );
            }

            var oldValues = new
            {
                entity.Name,
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
                    "La característica no fue encontrada"
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
