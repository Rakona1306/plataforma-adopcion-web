# Documentación de API Pública: Especies (Species)

Ruta base `api/v1/species` · **No requiere autenticación** · Solo lectura · Actualizado el 2026-10-06

## 1. ¿De qué trata este documento?

Esta API pública permite **consultar la lista de especies de animales** (por ejemplo: Canino, Felino, Ave) que existen en el sistema del refugio. Cualquier persona o aplicación (una web, una app móvil, Postman) puede usarla **sin iniciar sesión**.

Solo existe **un endpoint** y solo sirve para **leer** datos. No se puede crear, editar ni borrar especies desde aquí (eso se hace en la API privada).

Su uso más común es **llenar un selector de especies** (un dropdown) y luego usar el `id` elegido para filtrar razas en la API pública de Razas (ver ejemplo 6).

## 2. Endpoint: Listar especies

- **Método:** `GET`
- **URL completa de ejemplo:** `https://tu-dominio.com/api/v1/species`
- **Cabeceras necesarias:** ninguna especial. No necesitas `Authorization`.

### 2.1 Parámetros que puedes enviar

Todos son **opcionales**. Si no envías ninguno, la API devuelve la primera página con 10 especies, de la más reciente a la más antigua.

| Parámetro  | Tipo          | Valor por defecto | ¿Stackeable? | ¿Para qué sirve?                                                                                   |
| ---------- | ------------- | :---------------: | :----------: | -------------------------------------------------------------------------------------------------- |
| `Page`     | número entero |        `1`        |      No      | Qué página quieres ver. Empieza en 1.                                                              |
| `PageSize` | número entero |       `10`        |      No      | Cuántas especies quieres por página. Máximo permitido: **50**.                                     |
| `Search`   | texto         |      (vacío)      |      No      | Busca especies cuyo nombre **contenga** ese texto. No importa si escribes mayúsculas o minúsculas. |

Este endpoint **no tiene** parámetro `Sort` (no puedes elegir el orden) ni filtro por ID. Solo pagina y busca por nombre.

### 2.2 Orden de los resultados

El orden es **fijo**: las especies **más recientes primero** (por fecha de creación, de nuevo a viejo). No hay forma de cambiarlo desde la petición. Si necesitas orden alfabético, ordénalas tú en tu aplicación después de recibirlas.

### 2.3 Paginación con corrección automática

A diferencia de otros endpoints, aquí la API **corrige por ti** los valores de paginación inválidos en lugar de fallar:

| Si envías...                      | La API usa... |
| --------------------------------- | ------------- |
| `Page=0` o un número negativo     | `Page=1`      |
| `PageSize=0` o un número negativo | `PageSize=10` |
| `PageSize` mayor a 50 (ej. `100`) | `PageSize=50` |

Los valores ya corregidos son los que aparecen en la respuesta (`page` y `pageSize`). Así que si pediste `PageSize=100`, verás `"pageSize": 50` en el resultado: no es un error, es el límite máximo.

### 2.4 Respuesta exitosa (`200 OK`)

La API devuelve un objeto con la lista de especies y datos para armar la paginación.

| Campo          | Tipo   | ¿Qué contiene?                                                                |
| -------------- | ------ | ----------------------------------------------------------------------------- |
| `items`        | lista  | Las especies de la página pedida                                              |
| `items[].id`   | GUID   | Identificador único de la especie                                             |
| `items[].name` | texto  | Nombre de la especie                                                          |
| `totalCount`   | número | Cantidad **total** de especies que cumplen tu búsqueda (en todas las páginas) |
| `page`         | número | La página actual (ya corregida si hizo falta)                                 |
| `pageSize`     | número | El tamaño de página usado (ya corregido si hizo falta)                        |
| `totalPages`   | número | Ver advertencia abajo                                                         |

En este endpoint público cada especie solo trae `id` y `name`. No incluye la fecha de creación (ese dato solo sale en la API privada).

> **Advertencia sobre `totalPages`:** el servicio público de Especies **no calcula** este campo. Es probable que llegue siempre como `0`, aunque haya datos. Mientras no se corrija en el backend, calcúlalo tú en tu cliente: `totalPages = Math.ceil(totalCount / pageSize)`.

## 3. ¿Qué filtro es stackeable?

**Ninguno.** Este endpoint solo acepta un valor por parámetro (`Page`, `PageSize`, `Search`). No hay filtros que permitan acumular varios valores a la vez.

Si necesitas acumular varias especies, eso se hace en la API pública de **Razas** (`api/v1/breeds`), con el parámetro `SpecieId`, separando los GUID con pipe. Los GUID que uses allí los obtienes de este endpoint.

### Cómo funciona `Search`

| Si envías...                                                 | La API hace...                                                         |
| ------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `Search=fel`                                                 | Encuentra `Felino` (no distingue mayúsculas)                           |
| `Search=FEL`                                                 | El mismo resultado que `fel`                                           |
| `Search=%20ave%20` (con espacios)                            | Quita los espacios de los extremos y busca `ave`                       |
| `Search=` (vacío) o solo espacios                            | No aplica búsqueda y devuelve todas                                    |
| Texto que está en medio del nombre (ej. `nin` para `Canino`) | También lo encuentra: busca coincidencias parciales en cualquier parte |

## 4. Ejemplos paso a paso

### Ejemplo 1: Pedir todas las especies (sin filtros)

**Petición**

```http
GET /api/v1/species
```

**Respuesta `200 OK`** (mock con 5 especies en total en el sistema)

```json
{
  "items": [
    { "id": "9a1b2c3d-4e5f-4a6b-8c7d-0e1f2a3b4c09", "name": "Reptil" },
    { "id": "4b5c6d7e-8f9a-4b0c-a1d2-3e4f5a6b7c10", "name": "Roedor" },
    { "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7", "name": "Ave" },
    { "id": "6d8e0a1b-2c3d-4e5f-9a7b-8c9d0e1f2a11", "name": "Felino" },
    { "id": "3fa85f64-5717-4562-b3fc-2c963f66afa1", "name": "Canino" }
  ],
  "totalCount": 5,
  "page": 1,
  "pageSize": 10,
  "totalPages": 0
}
```

**Cómo leerla:** hay 5 especies en total (`totalCount`) y caben todas en una página de 10. Fijáte que `totalPages` llega en `0` por lo explicado en 2.4; en realidad sería 1.

### Ejemplo 2: Paginar de a 2

**Petición**

```http
GET /api/v1/species?Page=2&PageSize=2
```

**Respuesta `200 OK`**

```json
{
  "items": [
    { "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7", "name": "Ave" },
    { "id": "6d8e0a1b-2c3d-4e5f-9a7b-8c9d0e1f2a11", "name": "Felino" }
  ],
  "totalCount": 5,
  "page": 2,
  "pageSize": 2,
  "totalPages": 0
}
```

Con 5 especies de a 2 por página hay 3 páginas (2 + 2 + 1). Calcula: `Math.ceil(5 / 2) = 3`.

### Ejemplo 3: Buscar por nombre

**Petición**

```http
GET /api/v1/species?Search=fel
```

**Respuesta `200 OK`**

```json
{
  "items": [
    { "id": "6d8e0a1b-2c3d-4e5f-9a7b-8c9d0e1f2a11", "name": "Felino" }
  ],
  "totalCount": 1,
  "page": 1,
  "pageSize": 10,
  "totalPages": 0
}
```

Aunque buscaste en minúsculas, encontró `Felino`.

### Ejemplo 4: Pedir más de lo permitido

Quiero 100 especies por página.

**Petición**

```http
GET /api/v1/species?PageSize=100
```

**Respuesta `200 OK`** (no es un error: la API baja el tamaño al máximo permitido)

```json
{
  "items": [
    { "id": "9a1b2c3d-4e5f-4a6b-8c7d-0e1f2a3b4c09", "name": "Reptil" },
    { "id": "4b5c6d7e-8f9a-4b0c-a1d2-3e4f5a6b7c10", "name": "Roedor" },
    { "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7", "name": "Ave" },
    { "id": "6d8e0a1b-2c3d-4e5f-9a7b-8c9d0e1f2a11", "name": "Felino" },
    { "id": "3fa85f64-5717-4562-b3fc-2c963f66afa1", "name": "Canino" }
  ],
  "totalCount": 5,
  "page": 1,
  "pageSize": 50,
  "totalPages": 0
}
```

Fijáte en `"pageSize": 50`: es el valor realmente aplicado, no el 100 que pediste.

### Ejemplo 5: Cuando no hay resultados

**Petición**

```http
GET /api/v1/species?Search=xyz123
```

**Respuesta `200 OK`** (no es un error: simplemente la lista viene vacía)

```json
{
  "items": [],
  "totalCount": 0,
  "page": 1,
  "pageSize": 10,
  "totalPages": 0
}
```

### Ejemplo 6: Usar las especies para filtrar razas

Este es el uso típico de la API. Son **dos pasos**:

**Paso 1.** Pide las especies y muestra sus nombres en un selector. Cada opción guarda su `id`.

```http
GET /api/v1/species
```

**Paso 2.** Cuando el usuario elija "Canino" (id `3fa85f64-5717-4562-b3fc-2c963f66afa1`), usa ese `id` en la API pública de razas:

```http
GET /api/v1/breeds?SpecieId=3fa85f64-5717-4562-b3fc-2c963f66afa1
```

Si el usuario elige varias especies, junta sus `id` con pipe en un solo `SpecieId` (se explica en la documentación de Razas pública).

## 5. Errores y cosas que pueden salir mal

Este endpoint es muy tolerante: casi cualquier valor raro se corrige solo. Estos son los casos a vigilar:

| Situación                                       | Qué pasa                                                                      | Cómo evitarlo                                    |
| ----------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------ |
| `Page=0` o negativo                             | No da error, usa `Page=1`                                                     | Usa `Page` mayor o igual a 1                     |
| `PageSize=0` o negativo                         | No da error, usa `PageSize=10`                                                | Usa `PageSize` entre 1 y 50                      |
| `PageSize` mayor a 50                           | No da error, usa `PageSize=50`                                                | Mira el `pageSize` de la respuesta               |
| `Page` o `PageSize` con letras (ej. `Page=abc`) | La API responde `400 Bad Request` porque no puede convertir el valor a número | Envía solo números enteros                       |
| `Sort` u otros parámetros no listados           | Se ignoran sin error                                                          | Usa solo `Page`, `PageSize` y `Search`           |
| Error interno del servidor                      | `500 Internal Server Error`                                                   | Reintenta más tarde y avisa al equipo de backend |

### Formato del error `500`

Si algo falla dentro del servidor, la API responde así:

```json
{
  "message": "Ocurrió un error interno al procesar la solicitud.",
  "error": "Detalle técnico de la excepción"
}
```

| Campo     | ¿Qué contiene?                                                                              |
| --------- | ------------------------------------------------------------------------------------------- |
| `message` | Un mensaje general en español, apto para mostrar al usuario                                 |
| `error`   | El detalle técnico de la excepción. **No lo muestres al usuario final**; sirve para depurar |

> **Nota de seguridad para el equipo de backend:** el campo `error` expone el mensaje interno de la excepción en un endpoint público. Puede filtrar información sensible (nombres de tablas, consultas, rutas). Se recomienda quitarlo o devolverlo solo en entorno de desarrollo.

## 6. Diferencias con otras APIs del módulo

| Aspecto                                  | Especies pública                 | Especies privada                               | Razas pública                                    |
| ---------------------------------------- | -------------------------------- | ---------------------------------------------- | ------------------------------------------------ |
| Ruta                                     | `api/v1/species`                 | `api/species`                                  | `api/v1/breeds`                                  |
| ¿Requiere token JWT?                     | No                               | Sí                                             | No                                               |
| Operaciones                              | Solo listar (`GET`)              | Listar, ver detalle, crear, editar, eliminar   | Solo listar (`GET`)                              |
| Parámetros                               | `Page`, `PageSize`, `Search`     | `Page`, `PageSize`, `Search`, `Sort`           | `Page`, `PageSize`, `Search`, `SpecieId`, `Sort` |
| ¿Puedo elegir el orden?                  | No (fijo: más recientes primero) | Sí                                             | Sí                                               |
| ¿Filtros stackeables?                    | Ninguno                          | Ninguno                                        | `SpecieId` (con pipe)                            |
| Campos por elemento                      | `id`, `name`                     | `id`, `name`, `createdAt`                      | `id`, `name`                                     |
| Máximo de `PageSize`                     | 50                               | Sin límite                                     | Sin límite                                       |
| Valores inválidos de `Page` y `PageSize` | Se corrigen solos                | Pueden causar error                            | Pueden causar error                              |
| ¿`totalPages` se calcula?                | No (llega en `0`)                | No (llega en `0`)                              | Sí                                               |
| ¿Busca sin distinguir mayúsculas?        | Sí                               | Probablemente no (depende de la base de datos) | Sí                                               |

## 7. Preguntas frecuentes

**¿Necesito registrarme o enviar un token?** No. Este endpoint es público.

**¿Puedo ordenar las especies alfabéticamente desde la API?** No. El orden es fijo (más recientes primero). Ordénalas en tu aplicación si lo necesitas.

**¿Por qué me devuelve `200` aunque no haya resultados?** Porque la petición fue correcta; simplemente ninguna especie cumplió la búsqueda. Revisa que `items` esté vacío y `totalCount` sea `0`.

**¿Por qué me devuelve `pageSize` distinto al que pedí?** Porque el máximo permitido es 50 y los valores menores a 1 se reemplazan por 10.

**¿Por qué `totalPages` me llega en 0 aunque haya datos?** Porque el servicio no lo calcula. Usa `Math.ceil(totalCount / pageSize)` en tu cliente.

**¿La búsqueda distingue mayúsculas?** No. `fel`, `FEL` y `Fel` dan el mismo resultado. Además busca coincidencias parciales en cualquier parte del nombre.

**¿Los nombres de los parámetros distinguen mayúsculas?** No, `PageSize` y `pageSize` funcionan igual.

**¿Dónde obtengo más datos de una especie (como su fecha de creación)?** Solo en la API privada de Especies, que requiere token.
