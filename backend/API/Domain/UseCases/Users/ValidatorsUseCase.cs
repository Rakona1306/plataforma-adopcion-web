using System.Linq;

namespace API.Domain.UseCases.Users
{
    public class ValidatorsUseCase
    {
        public static bool ValidateUser(string dni, string name, string lastName)
        {
            // Validar que el DNI tenga 8 dígitos
            if (dni.Length != 8 || !dni.All(char.IsDigit))
            {
                return false;
            }

            // Validar que el primer dígito no sea cero
            if (dni[0] == '0')
            {
                return false;
            }

            return true;
        }
    }
}