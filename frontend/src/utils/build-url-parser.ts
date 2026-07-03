// utils/filter-url-parser.ts

/**
 * Convierte cualquier objeto plano con filtros, DTOs o estados en una instancia de URLSearchParams.
 * - Convierte arrays en cadenas separadas por comas (ej: [1, 2] -> "1,2")
 * - Elimina valores nulos, undefined o strings vacíos automáticamente.
 * - Mantiene números y booleanos limpios.
 */
export function buildUrlParams<T extends Record<string, any>>(filters: T): URLSearchParams {
    const params = new URLSearchParams();

    if (!filters) return params;

    Object.entries(filters).forEach(([key, value]) => {
        // Ignorar nulos, undefined o strings vacíos tras hacer trim
        if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
            return;
        }

        // Si es un Array (ej: gender: ['MALE', 'FEMALE'])
        if (Array.isArray(value)) {
            if (value.length > 0) {
                const joinedValues = value
                    .map((item) => String(item).trim())
                    .filter((item) => item !== '')
                    .join(',');

                if (joinedValues) params.append(key, joinedValues);
            }
            return;
        }

        // Si es un objeto regular (y no es un Date), se podría procesar recursivo si se requiere,
        // pero para DTOs planos extraemos el valor primitivo directamente.
        if (typeof value === 'object' && !(value instanceof Date)) {
            return;
        }

        // Para strings primitivos, números o booleanos (ej: page, minAge, search)
        params.append(key, String(value).trim());
    });

    return params;
}