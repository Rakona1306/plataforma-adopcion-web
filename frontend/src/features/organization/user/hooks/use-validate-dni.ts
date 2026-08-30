import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ValidateDniResponse } from "../dto/validate-dni-response";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { userService } from "../services/user.service";
import { normalizeText } from "@/core/shared/utils/normalizeText";

export default function useValidateDni() {
  const queryClient = useQueryClient();
  const [isValidating, setIsValidating] = useState(false);

  async function validateDni(dni: string): Promise<ValidateDniResponse> {
    setIsValidating(true);
    try {
      // fetchQuery permite awaitear el resultado imperativamente
      // manteniendo el cache de React Query (mismo dni no re-pega a la API)
      return await queryClient.fetchQuery({
        queryKey: [QUERY_KEYS.ORGANIZATION.USER.VALIDATE_DNI, dni],
        queryFn: () => userService.validateDni(dni),
        staleTime: Infinity,
      });
    } finally {
      setIsValidating(false);
    }
  }

  function checkDniWithAccount(
    name: string,
    lastName: string,
    dniData: ValidateDniResponse,
  ): boolean {
    const { nombres, apellidoPaterno, apellidoMaterno } = dniData.data;

    const nombreCoincide = normalizeText(name) === normalizeText(nombres);
    const apellidoCoincide =
      normalizeText(lastName) ===
      normalizeText(`${apellidoPaterno} ${apellidoMaterno}`);

    return nombreCoincide && apellidoCoincide;
  }

  return {
    validateDni,
    checkDniWithAccount,
    isValidating,
  };
}
