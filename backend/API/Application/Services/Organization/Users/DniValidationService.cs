using System.Net.Http.Headers;
using System.Net.Http.Json;
using API.Application.Features.Organization.Users.Dtos.Private;
using API.Infrastructure.Exceptions;
using Microsoft.Extensions.Options;

namespace API.Application.Services.Organization.Users
{
    public class ExternalApiSettings
    {
        public string DniApiBaseUrl { get; set; } = string.Empty;
        public string DniApiKey { get; set; } = string.Empty;
    }
    public interface IDniValidationService
    {
        Task<DniValidationResponse> ValidateAsync(string dni, CancellationToken cancellationToken = default);
    }
    public class DniValidationService : IDniValidationService
    {
        private readonly HttpClient _httpClient;

        public DniValidationService(HttpClient httpClient, IOptions<ExternalApiSettings> options)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri(options.Value.DniApiBaseUrl);
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", options.Value.DniApiKey);
        }

        public async Task<DniValidationResponse> ValidateAsync(string dni, CancellationToken cancellationToken = default)
        {
            var response = await _httpClient.GetAsync($"api/v1/dni/{dni}", cancellationToken);

            // Si la API externa está caída, timeout, 500, etc. (no es el caso de "no encontrado", que viene con 200 + success:false)
            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"El servicio de validación de DNI no respondió correctamente (status {(int)response.StatusCode})");
            }

            var result = await response.Content.ReadFromJsonAsync<DniApiResponse>(cancellationToken: cancellationToken);

            if (result is null)
                throw new Exception("Respuesta inválida del servicio de validación de DNI");

            if (!result.Success || result.Data is null)
            {
                throw new DniNotFoundException(
                    result.Error ?? "DNI no encontrado",
                    result.Code ?? "NOT_FOUND"
                );
            }

            return new DniValidationResponse
            {
                Dni = result.Data.Dni,
                Nombres = result.Data.Nombres,
                ApellidoPaterno = result.Data.ApellidoPaterno,
                ApellidoMaterno = result.Data.ApellidoMaterno,
                NombreCompleto = result.Data.NombreCompleto
            };
        }
    }
}