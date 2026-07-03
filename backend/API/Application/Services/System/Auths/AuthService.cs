using API.Application.Common.Services;
using API.Application.Features.System.Auths.Dtos;
using API.Application.Features.System.Auths.Mappers;
using API.Domain.Model;
using API.Domain.Model.Organization;
using API.Domain.Model.System;
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
        private readonly IEmailService _emailService;
        private readonly IEmailVerificationRepository _emailVerificationRepository;
        private readonly JwtOptions _jwtOptions;
        private readonly AuthMapper _mapper;

        public AuthService(
            IAuthRepository repository,
            IUserRepository userRepository,
            IOptions<JwtOptions> jwtOptions,
            IRoleRepository roleRepository,
            IEmailService emailService,
            IEmailVerificationRepository emailVerificationRepository
        )
        {
            _mapper = new AuthMapper();
            _repository = repository;
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _emailService = emailService;
            _emailVerificationRepository = emailVerificationRepository;
            _jwtOptions = jwtOptions.Value;
        }

        public async Task<RegisterResponse> RegisterAsync(CreateAccountDto request)
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
                throw new BadRequestException(
                    "El email ya tiene cuenta"
                );
            }

            await _emailVerificationRepository.DeleteByEmailAsync(request.Email);

            // Generar código de 6 dígitos
            string verificationCode = GenerateVerificationCode();

            // Crear registro de verificación
            var emailVerification = new EmailVerification
            {
                Email = request.Email,
                VerificationCode = verificationCode,
                ExpiresAt = DateTime.UtcNow.AddMinutes(15),
                IsVerified = false,
                Attempts = 0
            };

            // Guardar en base de datos
            await _emailVerificationRepository.CreateAsync(emailVerification);

            // Enviar email con código
            await _emailService.SendVerificationCodeAsync(request.Email, verificationCode);
            Console.WriteLine($"Código generado para {request.Email}: {verificationCode}");

            return new RegisterResponse
            {
                Message = "Código de verificación enviado a tu email. Por favor verifica tu correo.",
                Email = request.Email
            };
        }

        public async Task<AuthResponse> ConfirmEmailAsync(ConfirmEmailDto request)
        {
            request.Email = request.Email.Trim().ToLower();

            // Obtener la verificación de email
            var emailVerification = await _emailVerificationRepository.GetByEmailAsync(request.Email);

            if (emailVerification == null)
            {
                throw new BadRequestException("Email no encontrado o código expirado.");
            }

            // Validar el código
            if (emailVerification.VerificationCode != request.Code)
            {
                emailVerification.Attempts++;

                if (emailVerification.Attempts >= 5)
                {
                    await _emailVerificationRepository.DeleteAsync(emailVerification.Id);
                    throw new BadRequestException("Demasiados intentos. Por favor intenta registrarte nuevamente.");
                }

                await _emailVerificationRepository.UpdateAsync(emailVerification);
                throw new BadRequestException("Código de verificación inválido.");
            }

            // Marcar como verificado
            emailVerification.IsVerified = true;
            await _emailVerificationRepository.UpdateAsync(emailVerification);

            return new AuthResponse
            {
                Token = "",
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

        private string GenerateVerificationCode()
        {
            Random random = new Random();
            return random.Next(100000, 999999).ToString();
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

        public async Task<AuthResponse> CompleteRegistrationAsync(CreateAccountDto request)
        {
            request.Email = request.Email.Trim().ToLower();

            // Validar que el email esté verificado
            var emailVerification = await _emailVerificationRepository.GetByEmailVerifiedAsync(request.Email, request.Code);
            Console.WriteLine($"Email verification for {request.Email}: {emailVerification?.IsVerified}");

            if (emailVerification == null || !emailVerification.IsVerified)
            {
                throw new BadRequestException("El email debe estar verificado antes de completar el registro.");
            }

            // Buscar el rol "USUARIOS"
            var role = await _roleRepository.SearchRoleByName("USUARIOS");
            if (role == null)
            {
                throw new BadRequestException("El rol 'USUARIOS' no ha sido encontrado en el sistema.");
            }

            // Crear el usuario
            string hashedPassword = _repository.HashPassword(request.Password);

            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = request.Email,
                Name = request.Name,
                LastName = request.LastName,
                Password = hashedPassword,
                RoleId = role.Id,
                CreatedAt = DateTime.UtcNow
            };

            await _userRepository.CreateAsync(user, null);

            // Eliminar registro de verificación
            await _emailVerificationRepository.DeleteAsync(emailVerification.Id);

            // Generar token
            var expiresAtUtc = DateTime.UtcNow.AddMinutes(_jwtOptions.ExpirationMinutes);
            var token = GenerateToken(user, expiresAtUtc);
            var userResponse = _mapper.ToResponse(user);

            userResponse.ToDashboard = role.ToDashboard;

            return new AuthResponse
            {
                Token = token,
                User = userResponse
            };
        }
    }
}
