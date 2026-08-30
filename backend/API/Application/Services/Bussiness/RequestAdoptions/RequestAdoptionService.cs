using API.Application.Features.Bussiness.RequestAdoptions.Dtos;
using API.Application.Features.Bussiness.RequestAdoptions.Dtos.Private;
using API.Domain.Common.Model;
using API.Domain.Model.Bussiness;
using API.Domain.Model.Enums;
using API.Domain.Repository.Bussiness;
using API.Domain.Repository.Shelter;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Bussiness.RequestAdoptions
{
    public interface IRequestAdoptionService
    {
        Task Create(CreateRequestAdoption dto, Guid userId);
        Task Update(UpdateRequestAdoption dto, Guid userId);
        Task<Paginate<RequestAdoptionResponse>> Paginate(RequestAdoptionFilter filter);
        Task Delete(int id, Guid userId);
        Task<RequestAdoptionResponse> Review(ReviewRequestAdoption dto, Guid reviewerId);
        Task AddComment(int id, string comment, Guid userId);
        Task<RequestAdoptionResponse?> GetById(int id);
    }
    public class RequestAdoptionService : IRequestAdoptionService
    {
        private readonly IRequestAdoptionRepository _requestAdoptionRepository;
        private readonly IPetRepository _petRepository;
        private readonly IAdoptionRepository _adoptionRepository;
        private readonly IMapper _mapper;

        public RequestAdoptionService(
            IPetRepository petRepository,
            IRequestAdoptionRepository requestAdoptionRepository,
            IAdoptionRepository adoptionRepository,
            IMapper mapper)
        {
            _requestAdoptionRepository = requestAdoptionRepository;
            _adoptionRepository = adoptionRepository;
            _mapper = mapper;
            _petRepository = petRepository;
        }

        public async Task Create(CreateRequestAdoption dto, Guid userId)
        {
            var existingRequest = await _requestAdoptionRepository
                .Query()
                .AnyAsync(r => r.UserId == userId && r.PetId == dto.PetId && r.Status == RequestStatus.PENDIENTE);

            if (existingRequest)
            {
                throw new InvalidOperationException(
                    "Ya tienes una solicitud pendiente para esta mascota.");
            }

            var requestAdoption = _mapper.Map<RequestAdoption>(dto);
            requestAdoption.UserId = userId;
            requestAdoption.Status = RequestStatus.PENDIENTE;
            requestAdoption.CreatedAt = DateTime.UtcNow;
            requestAdoption.CreatedBy = userId;
            requestAdoption.LastUpdatedAt = DateTime.UtcNow;
            requestAdoption.PlatformProvider = PlatformProvider.Sistema;

            await _requestAdoptionRepository.CreateAsync(requestAdoption, userId);
            await _requestAdoptionRepository.SaveChangesAsync();
        }

        public async Task Update(UpdateRequestAdoption dto, Guid userId)
        {
            var requestAdoption = await _requestAdoptionRepository
                .Query()
                .FirstOrDefaultAsync(r => r.Id == dto.Id);

            if (requestAdoption is null)
            {
                throw new KeyNotFoundException(
                    $"No se encontró la solicitud de adopción con Id {dto.Id}");
            }

            if (requestAdoption.Status != RequestStatus.PENDIENTE)
            {
                throw new InvalidOperationException(
                    "No se puede modificar una solicitud que ya ha sido revisada.");
            }

            _mapper.Map(dto, requestAdoption);
            requestAdoption.LastUpdatedAt = DateTime.UtcNow;
            requestAdoption.UpdatedBy = userId;

            await _requestAdoptionRepository.UpdateAsync(requestAdoption, userId);

            await _requestAdoptionRepository.SaveChangesAsync();
        }

        public async Task<Paginate<RequestAdoptionResponse>> Paginate(RequestAdoptionFilter filter)
        {
            IQueryable<RequestAdoption> query = _requestAdoptionRepository.Query();

            if (filter.Status.HasValue)
                query = query.Where(x => x.Status == filter.Status.Value);

            if (filter.UserId.HasValue)
                query = query.Where(x => x.UserId == filter.UserId.Value);

            if (filter.PetId.HasValue)
                query = query.Where(x => x.PetId == filter.PetId.Value);

            if (filter.ReviewedById.HasValue)
                query = query.Where(x => x.ReviewedBy == filter.ReviewedById.Value);

            if (filter.CreatedFrom.HasValue)
                query = query.Where(x => x.CreatedAt >= filter.CreatedFrom.Value);

            if (filter.CreatedTo.HasValue)
                query = query.Where(x => x.CreatedAt <= filter.CreatedTo.Value);

            if (filter.ReviewedFrom.HasValue)
                query = query.Where(x => x.ReviewedAt >= filter.ReviewedFrom.Value);

            if (filter.ReviewedTo.HasValue)
                query = query.Where(x => x.ReviewedAt <= filter.ReviewedTo.Value);

            if (filter.HasOtherPets.HasValue)
                query = query.Where(x => x.HasOtherPets == filter.HasOtherPets.Value);

            if (filter.HasChildren.HasValue)
                query = query.Where(x => x.HasChildren == filter.HasChildren.Value);

            if (filter.AcceptHomeVisit.HasValue)
                query = query.Where(x => x.AcceptHomeVisit == filter.AcceptHomeVisit.Value);

            if (!string.IsNullOrWhiteSpace(filter.District))
                query = query.Where(x => x.District.Contains(filter.District));

            if (!string.IsNullOrWhiteSpace(filter.HouseType))
                query = query.Where(x => x.HouseType.Contains(filter.HouseType));

            if (!string.IsNullOrWhiteSpace(filter.Search))
            {
                var searchTerm = filter.Search.ToLower();
                query = query.Where(x =>
                    x.Motivation.ToLower().Contains(searchTerm) ||
                    x.District.ToLower().Contains(searchTerm) ||
                    x.Phone.Contains(searchTerm) ||
                    x.User.Email.ToLower().Contains(searchTerm) ||
                    !string.IsNullOrWhiteSpace(x.User.Dni) && x.User.Dni.ToLower().Contains(searchTerm)
                    );
            }

            int totalItems = await query.CountAsync();

            var orderedQuery = query.OrderBy(x => x.Status == RequestStatus.PENDIENTE ? 0 : 1);

            // 2do nivel de orden: el criterio elegido por el usuario, como desempate
            orderedQuery = filter.OrderBy?.ToLower() switch
            {
                "status" => filter.IsDescending ? orderedQuery.ThenByDescending(x => x.Status) : orderedQuery.ThenBy(x => x.Status),
                "district" => filter.IsDescending ? orderedQuery.ThenByDescending(x => x.District) : orderedQuery.ThenBy(x => x.District),
                "reviewedat" => filter.IsDescending ? orderedQuery.ThenByDescending(x => x.ReviewedAt) : orderedQuery.ThenBy(x => x.ReviewedAt),
                _ => filter.IsDescending ? orderedQuery.ThenByDescending(x => x.CreatedAt) : orderedQuery.ThenBy(x => x.CreatedAt)
            };

            var items = await orderedQuery
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ProjectTo<RequestAdoptionResponse>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return new Paginate<RequestAdoptionResponse>
            {
                Items = items,
                TotalCount = totalItems,
                Page = filter.Page,
                PageSize = filter.PageSize
            };
        }

        public async Task Delete(int id, Guid userId)
        {
            var requestAdoption = await _requestAdoptionRepository
                .Query()
                .FirstOrDefaultAsync(r => r.Id == id);

            if (requestAdoption is null)
            {
                throw new KeyNotFoundException(
                    $"No se encontró la solicitud de adopción con Id {id}");
            }

            if (requestAdoption.Status == RequestStatus.APROBADO)
            {
                await DisableAssociatedAdoption(requestAdoption);
            }

            await _requestAdoptionRepository.DeleteAsync(requestAdoption, userId);
            await _requestAdoptionRepository.SaveChangesAsync();
        }

        public async Task<RequestAdoptionResponse> Review(ReviewRequestAdoption dto, Guid reviewerId)
        {
            var requestAdoption = await _requestAdoptionRepository
                .Query()
                .FirstOrDefaultAsync(r => r.Id == dto.Id);

            if (requestAdoption is null)
            {
                throw new KeyNotFoundException(
                    $"No se encontró la solicitud de adopción con Id {dto.Id}");
            }

            // Estados terminales: una vez ahí, no se puede modificar más
            var isLocked = requestAdoption.Status == RequestStatus.RECHAZADO ||
                           requestAdoption.Status == RequestStatus.CANCELADO;

            if (isLocked)
            {
                throw new InvalidOperationException("Esta solicitud ya fue revisada y no puede ser modificada.");
            }

            var previousStatus = requestAdoption.Status;
            var newStatus = dto.Status;

            var oldValues = new
            {
                requestAdoption.Status,
                requestAdoption.ReviewedAt,
                requestAdoption.ReviewedBy,
                requestAdoption.ReviewComment
            };

            // === LÓGICA DE ADOPTION ===
            if (previousStatus != RequestStatus.APROBADO && newStatus == RequestStatus.APROBADO)
            {
                await CreateAdoptionFromRequest(requestAdoption, reviewerId);
            }
            else if (previousStatus == RequestStatus.APROBADO && newStatus != RequestStatus.APROBADO)
            {
                await DisableAssociatedAdoption(requestAdoption, reviewerId);
            }

            // === FLUJO NORMAL DE REVIEW ===
            requestAdoption.Status = newStatus;
            requestAdoption.ReviewedAt = DateTime.UtcNow;
            requestAdoption.ReviewedBy = reviewerId;
            requestAdoption.ReviewComment = dto.ReviewComment;

            // FIX: la entidad viene con AsNoTracking() desde Query(), EF no la está
            // vigilando. Sin este UpdateAsync (que hace DbSet.Update(entity) internamente),
            // el SaveChangesAsync de abajo no detecta ningún cambio en RequestAdoption.
            await _requestAdoptionRepository.UpdateAsync(requestAdoption, reviewerId, oldValues);

            await _requestAdoptionRepository.SaveChangesAsync();

            // Devolvemos el estado final completo para poder verificarlo
            return _mapper.Map<RequestAdoptionResponse>(requestAdoption);
        }

        public async Task AddComment(int id, string comment, Guid userId)
        {
            var requestAdoption = await _requestAdoptionRepository
                .Query()
                .FirstOrDefaultAsync(r => r.Id == id);

            if (requestAdoption is null)
            {
                throw new KeyNotFoundException(
                    $"No se encontró la solicitud de adopción con Id {id}");
            }

            if (requestAdoption.UserId != userId && requestAdoption.ReviewedBy != userId)
            {
                throw new UnauthorizedAccessException(
                    "No tienes permisos para agregar comentarios a esta solicitud.");
            }

            requestAdoption.ReviewComment = comment;
            requestAdoption.LastUpdatedAt = DateTime.UtcNow;
            requestAdoption.UpdatedBy = userId;

            await _requestAdoptionRepository.SaveChangesAsync();
        }

        public async Task<RequestAdoptionResponse?> GetById(int id)
        {
            var requestAdoption = await _requestAdoptionRepository
                .Query()
                .FirstOrDefaultAsync(r => r.Id == id);

            return requestAdoption is null
                ? null
                : _mapper.Map<RequestAdoptionResponse>(requestAdoption);
        }

        // === MÉTODOS PRIVADOS PARA MANEJO DE ADOPTION ===

        private async Task CreateAdoptionFromRequest(RequestAdoption requestAdoption, Guid createdBy)
        {
            var existingAdoption = await _adoptionRepository
                .Query()
                .AnyAsync(a => a.RequestAdoptionId == requestAdoption.Id);

            if (existingAdoption)
            {
                throw new InvalidOperationException("Ya existe una adopción registrada para esta solicitud.");
            }

            var pet = await _petRepository.Query().FirstOrDefaultAsync(p => p.Id == requestAdoption.PetId);

            if (pet is null)
            {
                throw new KeyNotFoundException($"No se encontró la mascota con Id {requestAdoption.PetId}");
            }

            if (!pet.IsAdopted)
            {
                pet.IsAdopted = true;
                await _petRepository.UpdateAsync(pet, createdBy);
            }

            var adoption = new Adoption
            {
                RequestAdoptionId = requestAdoption.Id,
                AdoptionDate = DateTime.UtcNow,
                Status = AdoptionStatus.HABILITADA,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = createdBy,
                LastUpdatedAt = DateTime.UtcNow
            };

            await _adoptionRepository.CreateAsync(adoption, createdBy);
        }

        private async Task DisableAssociatedAdoption(RequestAdoption requestAdoption, Guid? updatedBy = null)
        {
            var adoption = await _adoptionRepository
                .Query()
                .FirstOrDefaultAsync(a => a.RequestAdoptionId == requestAdoption.Id);

            var pet = await _petRepository.Query().FirstOrDefaultAsync(p => p.Id == requestAdoption.PetId);

            if (pet is null)
            {
                throw new KeyNotFoundException($"No se encontró la mascota con Id {requestAdoption.PetId}");
            }

            if (adoption is not null)
            {
                // Se deshabilita en vez de borrar para preservar el historial
                // de AdoptionFollowUp asociados a esta adopción.
                adoption.Status = AdoptionStatus.DESHABILITADA;
                adoption.LastUpdatedAt = DateTime.UtcNow;
                adoption.UpdatedBy = updatedBy;
                await _adoptionRepository.UpdateAsync(adoption, updatedBy);
            }

            if (pet.IsAdopted)
            {
                pet.IsAdopted = false;
                await _petRepository.UpdateAsync(pet, updatedBy);
            }
        }
    }
}