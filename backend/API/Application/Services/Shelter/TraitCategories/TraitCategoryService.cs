using API.Application.Common.Services;
using API.Application.Features.Shelter.TraitCategories.Dtos;
using API.Application.Features.Shelter.TraitCategories.Mappers;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Application.Helpers;
using API.Domain.Common.Model;
using API.Domain.Model.Shelter;
using API.Domain.Repository.Shelter;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Shelter.TraitCategories
{
    public class TraitCategoryService : BaseService<TraitCategory, ITraitCategoryRepository>, ITraitCategoryService
    {
        private readonly ITraitCategoryRepository _repository;
        private readonly TraitCategoryMapper _mapper;
        public TraitCategoryService(
            ITraitCategoryRepository repository,
            TraitCategoryMapper mapper,
            AuditLogMapper auditLogMapper
            ) : base(repository, auditLogMapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<
       Paginate<TraitCategoryResponse>
   > GetAllAsync(
       TraitCategoryFilterDto filter
   )
        {
            IQueryable<TraitCategory> query =
                _repository.Query()
                    .Include(x => x.Traits);

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

            return new Paginate<
                TraitCategoryResponse>
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

        public async Task<
            TraitCategoryResponse?
        > GetByIdAsync(Guid id)
        {
            var entity =
                await _repository.Query()
                    .Include(x => x.Traits)
                    .FirstOrDefaultAsync(x =>
                        x.Id == id
                    );

            if (entity is null)
            {
                throw new Exception(
                    "Caracteristica no encontrada"
                );
            }

            return _mapper.ToResponse(entity);
        }

        public async Task<
            TraitCategoryResponse
        > CreateAsync(
            CreateTraitCategoryDto dto,
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
                    "r"
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
            TraitCategoryResponse
        > UpdateAsync(
            Guid id,
            UpdateTraitCategoryDto dto,
            Guid? userId = null
        )
        {
            var entity =
                await _repository.GetByIdAsync(id);

            if (entity is null)
            {
                throw new Exception(
                    "Valor no encontrado"
                );
            }

            var oldValues = new
            {
                entity.Name,
                entity.Description
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
                    "Valor no encontrado"
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
