using API.Application.Common.Services;
using API.Application.Features.Organization.Users.Dtos;
using API.Application.Features.Organization.Users.Mappers;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Application.Helpers;
using API.Domain.Common.Model;
using API.Domain.Model.Organization;
using API.Domain.Repository.Organization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Organization.Users
{
    public class UserService : BaseService<Role, IRoleRepository>, IUserService
    {
        private readonly IUserRepository _repository;

        private readonly IRoleRepository _roleRepository;

        private readonly UserMapper _mapper;
        private readonly PasswordHasher<User> _passwordHasher;

        public UserService(
            IUserRepository repository,
            IRoleRepository roleRepository,
            UserMapper mapper,
            AuditLogMapper auditLogMapper
        ) : base(roleRepository, auditLogMapper)
        {
            _repository = repository;
            _roleRepository = roleRepository;
            _mapper = mapper;
            _passwordHasher = new PasswordHasher<User>();
        }

        public async Task<Paginate<UserResponse>> GetAllAsync(
            UserFilterDto filter
        )
        {
            IQueryable<User> query = _repository.Query().Include(x => x.Role);

            if (!string.IsNullOrWhiteSpace(filter.Search))
            {
                query = query.Where(x =>
                    x.Name.Contains(filter.Search) ||
                    x.Email.Contains(filter.Search)
                );
            }

            if (filter.RoleId.HasValue)
            {
                query = query.Where(x =>
                    x.RoleId == filter.RoleId
                );
            }

            if (filter.IsBlocked.HasValue)
            {
                query = query.Where(x =>
                    x.IsBlocked == filter.IsBlocked
                );
            }

            var totalCount = await query.CountAsync();

            var items = await query
                .OrderByDescending(x => x.CreatedAt)
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            return new Paginate<UserResponse>
            {
                Items = _mapper.ToResponseList(items),
                TotalCount = totalCount,
                Page = filter.Page,
                PageSize = filter.PageSize
            };
        }

        public async Task<UserResponse?> GetByIdAsync(Guid id)
        {
            var entity = await _repository.Query()
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (entity is null)
                throw new Exception("Usuario no encontrado");

            return _mapper.ToResponse(entity);
        }

        public async Task<UserResponse> CreateAsync(
            CreateUserDto dto,
            Guid? userId
        )
        {
            var exists = await _repository.ExistsAsync(
                x => x.Email == dto.Email
            );

            if (exists)
                throw new Exception("El email ya existe");

            var roleExists =
                await _roleRepository.ExistsAsync(
                    x => x.Id == dto.RoleId
                );

            if (!roleExists)
                throw new Exception("Rol no encontrado");

            var entity = _mapper.ToEntity(dto);

            entity.Password =
                _passwordHasher.HashPassword(
                    entity,
                    dto.Password
                );

            AuditHelper.CreateAudit(entity, userId);

            await _repository.CreateAsync(
                entity,
                userId
            );

            await _repository.SaveChangesAsync();

            return (await GetByIdAsync(entity.Id))!;
        }

        public async Task<UserResponse> UpdateAsync(
            Guid id,
            UpdateUserDto dto,
            Guid? userId
        )
        {
            var entity = await _repository.GetByIdAsync(id);

            if (entity is null)
                throw new Exception("El usuario no ha sido encontrado");

            var oldValues = new
            {
                entity.Name,
                entity.LastName,
                entity.Phone,
                entity.IsBlocked
            };

            _mapper.Update(dto, entity);

            AuditHelper.UpdateAudit(entity, userId);

            await _repository.UpdateAsync(
                entity,
                userId,
                oldValues
            );

            await _repository.SaveChangesAsync();

            return (await GetByIdAsync(id))!;
        }

        public async Task DeleteAsync(
            Guid id,
            Guid? userId
        )
        {
            var entity = await _repository.GetByIdAsync(id);

            if (entity is null)
                throw new Exception("Usuario no encontrado");

            await _repository.DeleteAsync(
                entity,
                userId
            );

            await _repository.SaveChangesAsync();
        }
    }
}
