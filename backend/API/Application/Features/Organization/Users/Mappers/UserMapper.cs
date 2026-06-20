using API.Application.Features.Organization.Users.Dtos;
using API.Domain.Model.Organization;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Organization.Users.Mappers
{
    [Mapper]
    public partial class UserMapper
    {
        [MapperIgnoreTarget(nameof(User.Password))]
        public partial User ToEntity(
            CreateUserDto dto
        );

        public partial void Update(
            UpdateUserDto dto,
            [MappingTarget] User entity
        );

        [MapProperty(
            nameof(User.Role.Name),
            nameof(UserResponse.RoleName)
        )]
        [MapperIgnoreTarget(nameof(User.Password))]
        public partial UserResponse ToResponse(
            User entity
        );

        [MapperIgnoreTarget(nameof(User.Password))]
        public partial List<UserResponse> ToResponseList(
            List<User> entities
        );
    }
}