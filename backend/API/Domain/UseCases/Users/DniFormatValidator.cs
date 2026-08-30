using System.Linq;

namespace API.Domain.UseCases.Users
{
    public static class DniFormatValidator
    {
        private const int DNI_LENGTH = 8;

        public static bool IsValidFormat(string dni)
        {
            // Evita NullReferenceException / ArgumentNullException en dni.Length o dni.All
            if (string.IsNullOrWhiteSpace(dni))
                return false;

            // Debe tener exactamente 8 dígitos numéricos
            if (dni.Length != DNI_LENGTH || !dni.All(char.IsDigit))
                return false;

            // El primer dígito no puede ser 0
            if (dni[0] == '0')
                return false;

            return true;
        }
    }
}