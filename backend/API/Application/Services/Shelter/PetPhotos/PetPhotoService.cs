using API.Application.Common.Services;
using API.Application.Features.Shelter.PetPhotos.Dtos;
using API.Application.Features.Shelter.PetPhotos.Mappers;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Application.Helpers;
using API.Application.Services.Adapter.SupabaseS3;
using API.Domain.Common.Model;
using API.Domain.Model.Shelter;
using API.Domain.Repository.Shelter;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Shelter.PetPhotos
{
    public class PetPhotoService : BaseService<PetPhoto, IPetPhotoRepository>, IPetPhotoService
    {
        private readonly IPetPhotoRepository _repository;

        private readonly IPetRepository _petRepository;

        private readonly ISupabaseStorageService _storage;

        private readonly PetPhotoMapper _mapper;

        public PetPhotoService(
            IPetPhotoRepository repository,
            IPetRepository petRepository,
            ISupabaseStorageService storage,
            PetPhotoMapper mapper,
            AuditLogMapper auditLogMapper
        ) : base(repository, auditLogMapper)
        {
            _repository = repository;
            _petRepository = petRepository;
            _storage = storage;
            _mapper = mapper;
        }

        public async Task<Paginate<PetPhotoResponse>>
        GetAllAsync(
            PetPhotoFilterDto filter
        )
        {
            IQueryable<PetPhoto> query =
                _repository.Query();

            if (filter.PetId.HasValue)
            {
                query = query.Where(x =>
                    x.PetId == filter.PetId
                );
            }

            if (filter.IsMain.HasValue)
            {
                query = query.Where(x =>
                    x.IsMain == filter.IsMain
                );
            }

            var total =
                await query.CountAsync();

            var items = await query
                .OrderByDescending(x => x.CreatedAt)
                .Skip((filter.Page - 1)
                    * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            return new Paginate<PetPhotoResponse>
            {
                Items =
                    _mapper.ToResponseList(items),

                TotalCount = total,

                Page = filter.Page,

                PageSize = filter.PageSize
            };
        }

        public async Task<PetPhotoResponse?>
            GetByIdAsync(Guid id)
        {
            var entity =
                await _repository.GetByIdAsync(id);

            if (entity is null)
                throw new Exception(
                    "Pet photo not found"
                );

            return _mapper.ToResponse(entity);
        }

        public async Task<PetPhotoResponse>
            CreateAsync(
                CreatePetPhotoDto dto,
                Guid? userId
            )
        {
            var petExists =
                await _petRepository.ExistsAsync(
                    x => x.Id == dto.PetId
                );

            if (!petExists)
                throw new Exception(
                    "Pet not found"
                );

            var imageUrl =
                await _storage.UploadImageAsync(
                    dto.File,
                    "pets"
                );

            var entity = new PetPhoto
            {
                PetId = dto.PetId,
                Url = imageUrl,
                IsMain = dto.IsMain
            };

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

        public async Task<PetPhotoResponse>
            UpdateAsync(
                Guid id,
                UpdatePetPhotoDto dto,
                Guid? userId = null
            )
        {
            var entity =
                await _repository.GetByIdAsync(id);

            if (entity is null)
            {
                throw new Exception(
                    "Pet photo not found"
                );
            }

            var oldValues = new
            {
                entity.Url,
                entity.IsMain
            };

            // =========================
            // CHANGE IMAGE
            // =========================

            if (dto.File is not null)
            {
                // DELETE OLD IMAGE
                await _storage.DeleteFileAsync(
                    "pets",
                    entity.Url
                );

                // UPLOAD NEW IMAGE
                var newUrl =
                    await _storage.UploadImageAsync(
                        dto.File,
                        "pets"
                    );

                entity.Url = newUrl;
            }

            entity.IsMain = dto.IsMain;

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
                    "Pet photo not found"
                );
            }

            // =========================
            // DELETE FILE FROM STORAGE
            // =========================

            await _storage.DeleteFileAsync(
                "pets",
                entity.Url
            );

            // =========================
            // DELETE DATABASE RECORD
            // =========================

            await _repository.DeleteAsync(
                entity,
                userId
            );

            await _repository.SaveChangesAsync();
        }
    }
}
