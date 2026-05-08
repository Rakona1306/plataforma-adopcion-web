using API.Application.Features.Organization.Roles.Dtos;
using API.Application.Features.Roles.Mappers;
using API.Domain.Common.Model;
using API.Domain.Model.Organization;
using API.Domain.Repository.Organization;

namespace API.Application.Services.Organization.Roles
{
    public class RolesService: IRolesService
    {
        private readonly IRoleRepository _repository;
        private readonly RoleMapper _mapper;

        public RolesService (IRoleRepository roleRepository)
        {
            _mapper = new RoleMapper();
            _repository = roleRepository;
        }

        public async Task<RoleResponse> CreateAsync(CreateRoleDto request)
        {
            var role = _mapper.ToEntity(request);

            var created = await _repository.CreateAsync(role);

            return _mapper.ToResponse(created);
        }

        public Task DeleteAsync(int id, int? userId, string tableName)
        {
            var role = await _repository.GetByIdAsync(id);

            if (role is null)
            {
                throw new Exception("Role not found");
            }

            await _repository.DeleteAsync(role);
        }

        public Task<Paginate<RoleResponse>> GetAllAsync(int page, int pageSize, string? search = null, string? sort = null)
        {
            throw new NotImplementedException();
        }

        public Task<RoleResponse?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<RoleResponse> UpdateAsync(CreateRoleDto entity, int id, int? userId, string tableName)
        {
            throw new NotImplementedException();
        }
    }
}
