using API.Application.Features.Organization.Users.Dtos;
using API.Domain.Model;
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
            nameof(UserResponse.Role)
        )]
        public partial UserResponse ToResponse(
            User entity
        );

        public partial List<UserResponse> ToResponseList(
            List<User> entities
        );
    }
}
