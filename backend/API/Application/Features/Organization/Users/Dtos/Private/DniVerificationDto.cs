using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Features.Organization.Users.Dtos.Private
{
    public class DniApiResponse
    {
        public bool Success { get; set; }
        public DniApiData? Data { get; set; }
        public string? Error { get; set; }
        public string? Code { get; set; }
    }

    public class DniApiData
    {
        public string Dni { get; set; } = string.Empty;
        public string Nombres { get; set; } = string.Empty;
        public string ApellidoPaterno { get; set; } = string.Empty;
        public string ApellidoMaterno { get; set; } = string.Empty;
        public string NombreCompleto { get; set; } = string.Empty;
    }

    // DTO limpio que exponés al resto de la app (Controller, etc.)
    public class DniValidationResponse
    {
        public string Dni { get; set; } = string.Empty;
        public string Nombres { get; set; } = string.Empty;
        public string ApellidoPaterno { get; set; } = string.Empty;
        public string ApellidoMaterno { get; set; } = string.Empty;
        public string NombreCompleto { get; set; } = string.Empty;
    }
}