using API.Application.Features.System.Auths.Dtos;
using API.Application.Features.System.Auths.Mappers;
using API.Domain.Model;
using API.Domain.Model.Organization;
using API.Domain.Repository.Organization;
using API.Domain.Repository.System;
using API.Infrastructure.Exceptions;
using API.Infrastructure.Extensions.Jwt;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Application.Services.System.Auths
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _repository;
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly JwtOptions _jwtOptions;
        private readonly AuthMapper _mapper;

        public AuthService(
            IAuthRepository repository,
            IUserRepository userRepository,
            IOptions<JwtOptions> jwtOptions,
            IRoleRepository roleRepository
        )
        {
            _mapper = new AuthMapper();
            _repository = repository;
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _jwtOptions = jwtOptions.Value;
        }

        public async Task<AuthResponse> RegisterAsync(CreateAccountDto request)
        {
            request.Email = request.Email
                .Trim()
                .ToLower();

            bool exists =
                await _repository
                    .ExistsByEmailAsync(
                        request.Email
                    );

            if (exists)
            {
                throw new Exception(
                    "El email ya tiene cuenta"
                );
            }

            Role role = await _roleRepository.SearchRoleByName("USUARIOS");
            User user = _mapper.ToEntity(request);
            user.RoleId = role.Id;
            var hash = _repository.HashPassword(request.Password);
            user.Password = hash;

            Console.WriteLine(hash);

            User userCreated = await _userRepository
                .CreateAsync(user);

            var userMapped = _mapper.ToResponse(userCreated);
            var expiresAtUtc = DateTime.UtcNow.AddMinutes(_jwtOptions.ExpirationMinutes);
            var token = GenerateToken(user, expiresAtUtc);

            return new AuthResponse
            {
                Token = token,
                User = userMapped
            };
        }

        public async Task<AuthResponse> LoginAsync(LoginAccountDto request)
        {
            request.Email = request.Email.Trim().ToLower();

            User? user = await _userRepository.GetByEmailAsync(request.Email);
            if (user is null)
            {
                throw new NotAuthorizedException("Credenciales inválidas.");
            }

            bool validPassword = await _repository.VerifyPassword(
                        request.Password,
                        user.Password
                    );

            if (!validPassword)
            {
                throw new NotAuthorizedException("Credenciales inválidas.");
            }
            Console.WriteLine("Paso 1");
            var expiresAtUtc = DateTime.UtcNow.AddMinutes(_jwtOptions.ExpirationMinutes);
            var token = GenerateToken(user, expiresAtUtc);
            Console.WriteLine("Token: ", token);
            var userResponse = _mapper.ToResponse(user);
            var roleSelected = await _roleRepository.GetByIdAsync(user.RoleId);
            if (roleSelected is null)
            {
                throw new Exception("El rol no ha sido encontrado");
            }
            userResponse.ToDashboard = roleSelected.ToDashboard;

            return new AuthResponse
            {
                Token = token,
                User = userResponse
            };
        }

        public async Task<UserProfileResponse>
            ProfileAsync(
                Guid userId
            )
        {
            User? user =
                await _userRepository
                    .GetByIdAsync(userId);

            if (user is null)
            {
                throw new Exception(
                    "User not found"
                );
            }

            return new UserProfileResponse
            {
                Id = user.Id,
                Email = user.Email,
            };
        }

        public Task LogoutAsync()
        {
            return Task.CompletedTask;
        }

        private string GenerateToken(
            User user,
            DateTime expiresAtUtc
        )
        {
            var key =
            Encoding.UTF8.GetBytes(
                _jwtOptions.Key
            );

            var claims = new List<Claim>
            {
                new(
                    JwtRegisteredClaimNames.Sub,
                    user.Id.ToString()
                ),

                new(
                    JwtRegisteredClaimNames.Jti,
                    Guid.NewGuid().ToString()
                ),

                new(
                    JwtRegisteredClaimNames.Email,
                    user.Email
                ),

                new(
                    ClaimTypes.NameIdentifier,
                    user.Id.ToString()
                ),

                new(
                    ClaimTypes.Name,
                    $"{user.Name} {user.LastName}"
                ),

                new(
                    ClaimTypes.GivenName,
                    user.Name
                ),

                new(
                    ClaimTypes.Surname,
                    user.LastName
                )
            };

            var credentials =
                new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256
                );

            var token =
                new JwtSecurityToken(
                    issuer:
                        _jwtOptions.Issuer,

                    audience:
                        _jwtOptions.Audience,

                    claims:
                        claims,

                    notBefore:
                        DateTime.UtcNow,

                    expires:
                        expiresAtUtc,

                    signingCredentials:
                        credentials
                );

            return new JwtSecurityTokenHandler()
                .WriteToken(token);
        }
    }
}
