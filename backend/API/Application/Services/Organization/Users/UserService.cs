using API.Application.Common.Services;
using API.Application.Features.Organization.Users.Dtos;
using API.Application.Features.Organization.Users.Mappers;
using API.Application.Features.System.AuditLogs.Mappers;
using API.Application.Helpers;
using API.Domain.Common.Model;
using API.Domain.Model.Organization;
using API.Domain.Repository.Organization;
using API.Domain.Repository.System;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services.Organization.Users
{
    public class UserService : BaseService<Role, IRoleRepository>, IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IAuthRepository _authRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly UserMapper _mapper;

        public UserService(
            IAuthRepository authRespository,
            IUserRepository repository,
            IRoleRepository roleRepository,
            UserMapper mapper,
            AuditLogMapper auditLogMapper
        ) : base(roleRepository, auditLogMapper)
        {
            _authRepository = authRespository;
            _repository = repository;
            _roleRepository = roleRepository;
            _mapper = mapper;
        }

        public async Task<Paginate<UserResponse>> GetAllAsync(UserFilterDto filter)
        {
            IQueryable<User> query = _repository.Query().Include(x => x.Role);

            if (!string.IsNullOrWhiteSpace(filter.Search))
            {
                query = query.Where(x =>
                    x.Name.Contains(filter.Search) ||
                    x.Email.Contains(filter.Search) ||
                    x.LastName.Contains(filter.Search) ||
                    (x.Dni != null && x.Dni.Contains(filter.Search))
                );
            }

            if (!string.IsNullOrWhiteSpace(filter.RoleId))
            {
                var roleIds = filter.RoleId
                    .Split('|', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                    .Select(id => Guid.TryParse(id, out var guid) ? guid : (Guid?)null)
                    .Where(id => id.HasValue)
                    .Select(id => id!.Value)
                    .ToList();

                if (roleIds.Count > 0)
                {
                    query = query.Where(x => roleIds.Contains(x.RoleId));
                }
            }

            if (!string.IsNullOrWhiteSpace(filter.District))
            {
                var districts = filter.District
                    .Split('|', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                    .ToList();

                if (districts.Count > 0)
                {
                    query = query.Where(x => x.District != null && districts.Contains(x.District));
                }
            }

            if (filter.IsBlocked.HasValue)
            {
                query = query.Where(x => x.IsBlocked == filter.IsBlocked);
            }

            if (filter.ToDashboard.HasValue)
            {
                query = query.Where(x => x.Role != null && x.Role.ToDashboard == filter.ToDashboard);
            }

            query = filter.Sort switch
            {
                "name_asc" => query.OrderBy(x => x.Name),
                "name_desc" => query.OrderByDescending(x => x.Name),
                "email_asc" => query.OrderBy(x => x.Email),
                "email_desc" => query.OrderByDescending(x => x.Email),
                "createdAt_desc" => query.OrderByDescending(x => x.CreatedAt),
                "isBlocked_true" => query.OrderByDescending(x => x.IsBlocked),
                "isBlocked_false" => query.OrderBy(x => x.IsBlocked),
                _ => query.OrderBy(x => x.CreatedAt)
            };

            var totalCount = await query.CountAsync();

            var totalPages = totalCount == 0
                ? 0
                : (int)Math.Ceiling(totalCount / (double)filter.PageSize);

            var items = await query
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            return new Paginate<UserResponse>
            {
                Items = _mapper.ToResponseList(items),
                TotalCount = totalCount,
                Page = filter.Page,
                PageSize = filter.PageSize,
                TotalPages = totalPages
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
                _authRepository.HashPassword(
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

        public async Task ChangePassword(ChangePasswordDto changePasswordDto)
        {
            var entity = await _repository.Query()
                .FirstOrDefaultAsync(x => x.Email == changePasswordDto.Email);
            if (entity is null)
                throw new Exception("Usuario no encontrado");
            /*
            var result = _passwordHasher.VerifyHashedPassword(
                entity,
                entity.Password,
                changePasswordDto.Password
            );
            if (result == PasswordVerificationResult.Failed)
                throw new Exception("Contraseña actual incorrecta");
            */
            entity.Password = _authRepository.HashPassword(
                changePasswordDto.Password
            );
            await _repository.UpdateAsync(entity, null);
            await _repository.SaveChangesAsync();
        }

        public async Task ChangeAccountInfo(Guid id, ChangeAccountInfoDto dto, Guid? userId)
        {
            var entity = await _repository.GetByIdAsync(id);

            if (entity is null)
                throw new Exception("El usuario no ha sido encontrado");

            _mapper.UpdateInformation(dto, entity);

            if (entity.Id != userId)
            {
                throw new UnauthorizedAccessException();
            }

            await _repository.UpdateAsync(
                entity,
                null
            );

            await _repository.SaveChangesAsync();
        }
    }
}
