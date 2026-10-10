# Documentación de API: Especies (Species)

Ruta base `api/species` · **Requiere autenticación (JWT)** · Lectura y escritura · Actualizado el 2026-10-06

## 1. ¿De qué trata este documento?

Esta API permite **administrar las especies de animales** del refugio (por ejemplo: Canino, Felino, Ave). La especie es la categoría principal: cada **raza** pertenece a una especie (Labrador → Canino, Siamés → Felino).

Con ella puedes **listar, consultar, crear, editar y eliminar** especies. Es una API **privada**: todas las peticiones, incluso las de lectura, necesitan un token.

## 2. Autenticación

Todo el controlador está protegido con `[AuthorizeJwt]`. Envía tu token JWT en la cabecera `Authorization` en **todas** las peticiones:

```http
Authorization: Bearer <tu_token_jwt>
Content-Type: application/json
```

Si el token falta o no es válido, la API rechaza la petición con `401 Unauthorized`. El formato exacto del cuerpo de ese error lo define el atributo `AuthorizeJwt`, que no está en los archivos analizados.

## 3. Resumen de endpoints

| #   | Método   | Ruta               | ¿Qué hace?                             | Respuesta exitosa                     |
| --- | -------- | ------------------ | -------------------------------------- | ------------------------------------- |
| 1   | `GET`    | `api/species`      | Lista paginada y filtrable de especies | `200` con `Paginate<SpeciesResponse>` |
| 2   | `GET`    | `api/species/{id}` | Obtiene una especie por su ID          | `200` con `SpeciesResponse`           |
| 3   | `POST`   | `api/species`      | Crea una especie                       | `200` con `SpeciesResponse`           |
| 4   | `PUT`    | `api/species/{id}` | Actualiza el nombre de una especie     | `200` con `SpeciesResponse`           |
| 5   | `DELETE` | `api/species/{id}` | Elimina una especie                    | `204` sin cuerpo                      |

## 4. Endpoint: Listar especies

- **Método:** `GET`
- **URL completa de ejemplo:** `https://tu-dominio.com/api/species`
- **Cabeceras necesarias:** `Authorization: Bearer <tu_token_jwt>`

### 4.1 Parámetros que puedes enviar

Todos son **opcionales**. Si no envías ninguno, la API devuelve la primera página con 10 especies, de la más reciente a la más antigua.

| Parámetro  | Tipo          | Valor por defecto | ¿Stackeable? | ¿Para qué sirve?                                   |
| ---------- | ------------- | :---------------: | :----------: | -------------------------------------------------- |
| `Page`     | número entero |        `1`        |      No      | Qué página quieres ver. Empieza en 1.              |
| `PageSize` | número entero |       `10`        |      No      | Cuántas especies quieres por página.               |
| `Search`   | texto         |      (vacío)      |      No      | Busca especies cuyo nombre **contenga** ese texto. |
| `Sort`     | texto         |    `-created`     |      No      | Cómo ordenar los resultados (ver 4.2).             |

> **Sobre `Search` y las mayúsculas:** el filtro usa `Contains` de Entity Framework. Con PostgreSQL (la base que usa el proyecto en Razas) esto **distingue mayúsculas y minúsculas**: buscar `can` no encontraría `Canino`. Prueba tu caso real y, si quieres búsqueda sin distinguir mayúsculas, usa `EF.Functions.ILike` como ya se hace en Razas.

### 4.2 Valores válidos para `Sort`

| Valor                                        | ¿Qué hace?                                                       |
| -------------------------------------------- | ---------------------------------------------------------------- |
| `name`                                       | Orden alfabético de la A a la Z                                  |
| `-name`                                      | Orden alfabético de la Z a la A                                  |
| `created`                                    | Las especies más antiguas primero                                |
| `-created` (o cualquier otro valor, o vacío) | Las especies más recientes primero. **Es el orden por defecto.** |

El signo `-` delante significa **descendente**. A diferencia de Razas, aquí `Sort` **no distingue mayúsculas**: `NAME` y `name` funcionan igual. Si escribes un valor que no está en la tabla, no hay error: se usa el orden por defecto.

### 4.3 Respuesta exitosa (`200 OK`)

| Campo               | Tipo               | ¿Qué contiene?                                                              |
| ------------------- | ------------------ | --------------------------------------------------------------------------- |
| `items`             | lista              | Las especies de la página pedida                                            |
| `items[].id`        | GUID               | Identificador único de la especie                                           |
| `items[].name`      | texto              | Nombre de la especie                                                        |
| `items[].createdAt` | fecha y hora (UTC) | Cuándo se creó la especie                                                   |
| `totalCount`        | número             | Cantidad **total** de especies que cumplen tu filtro (en todas las páginas) |
| `page`              | número             | La página actual                                                            |
| `pageSize`          | número             | El tamaño de página usado                                                   |
| `totalPages`        | número             | Ver advertencia abajo                                                       |

> **Advertencia sobre `totalPages`:** el servicio de Especies **no calcula** este campo (a diferencia del de Razas). Es probable que llegue siempre como `0`. Mientras no se corrija en el backend, calcúlalo tú en el cliente: `totalPages = Math.ceil(totalCount / pageSize)`.

### 4.4 ¿Qué filtro es stackeable?

**Ninguno.** Este endpoint no tiene filtros que acepten varios valores a la vez. Cada parámetro (`Page`, `PageSize`, `Search`, `Sort`) acepta un solo valor.

Si necesitas filtrar **razas** por varias especies, eso se hace en el endpoint de Razas con el parámetro `SpeciesId` (o `SpecieId` en la API pública), separando los GUID con pipe. Los GUID que uses allí los obtienes de este endpoint.

## 5. Otros endpoints

### 5.1 Obtener una especie por ID

- **Método:** `GET`
- **Ruta:** `api/species/{id}`
- **Parámetro de ruta:** `id` (GUID de la especie)

**Petición**

```http
GET /api/species/3fa85f64-5717-4562-b3fc-2c963f66afa1
```

**Respuesta `200 OK`**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa1",
  "name": "Canino",
  "createdAt": "2026-07-15T08:30:00Z"
}
```

Si el `id` no tiene formato de GUID (ej. `/api/species/abc`), la API responde `400 Bad Request` antes de llegar al servicio. Si tiene formato válido pero no existe, ver la sección 7.

### 5.2 Crear una especie

- **Método:** `POST`
- **Ruta:** `api/species`

**Body que espera (`CreateSpeciesDto`)**

| Campo  | Tipo  | ¿Obligatorio? | ¿Qué es?             | Reglas                                                                                                    |
| ------ | ----- | :-----------: | -------------------- | --------------------------------------------------------------------------------------------------------- |
| `name` | texto |      Sí       | Nombre de la especie | No puede repetirse. La comparación **no distingue mayúsculas**: `canino` y `Canino` se consideran iguales |

```json
{
  "name": "Reptil"
}
```

**Respuesta `200 OK`** (devuelve la especie creada con su ID generado; no es `201`)

```json
{
  "id": "9a1b2c3d-4e5f-4a6b-8c7d-0e1f2a3b4c09",
  "name": "Reptil",
  "createdAt": "2026-10-06T14:20:00Z"
}
```

Si el nombre ya existe, la API devuelve el error `Species already exists` (ver sección 7).

### 5.3 Actualizar una especie

- **Método:** `PUT`
- **Ruta:** `api/species/{id}`
- **Parámetro de ruta:** `id` (GUID de la especie a editar)

**Body que espera (`UpdateSpeciesDto`)**

| Campo  | Tipo  | ¿Obligatorio? | ¿Qué es?                      |
| ------ | ----- | :-----------: | ----------------------------- |
| `name` | texto |      Sí       | El nuevo nombre de la especie |

```json
{
  "name": "Reptiles"
}
```

**Respuesta `200 OK`** (devuelve la especie ya actualizada)

```json
{
  "id": "9a1b2c3d-4e5f-4a6b-8c7d-0e1f2a3b4c09",
  "name": "Reptiles",
  "createdAt": "2026-10-06T14:20:00Z"
}
```

> **Ojo:** al actualizar, la API **no verifica** si el nuevo nombre ya existe en otra especie. Es posible quedar con nombres duplicados usando `PUT`.

### 5.4 Eliminar una especie

- **Método:** `DELETE`
- **Ruta:** `api/species/{id}`
- **Parámetro de ruta:** `id` (GUID de la especie)

**Petición**

```http
DELETE /api/species/9a1b2c3d-4e5f-4a6b-8c7d-0e1f2a3b4c09
```

**Respuesta `204 No Content`**: no trae cuerpo. Que no haya texto es normal y significa que se eliminó bien.

> **Antes de eliminar:** el servicio no revisa si la especie tiene razas asociadas. Qué ocurre en ese caso depende de la configuración de la base de datos (puede fallar por la relación o dejar razas huérfanas). Verifícalo antes de usar este endpoint en producción.

## 6. Ejemplos paso a paso del listado

### Ejemplo 1: Pedir todas las especies (sin filtros)

**Petición**

```http
GET /api/species
Authorization: Bearer <tu_token_jwt>
```

**Respuesta `200 OK`** (mock con 5 especies en total en el sistema)

```json
{
  "items": [
    { "id": "9a1b2c3d-4e5f-4a6b-8c7d-0e1f2a3b4c09", "name": "Reptil", "createdAt": "2026-10-06T14:20:00Z" },
    { "id": "4b5c6d7e-8f9a-4b0c-a1d2-3e4f5a6b7c10", "name": "Roedor", "createdAt": "2026-09-20T10:00:00Z" },
    { "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7", "name": "Ave", "createdAt": "2026-08-12T16:45:00Z" },
    { "id": "6d8e0a1b-2c3d-4e5f-9a7b-8c9d0e1f2a11", "name": "Felino", "createdAt": "2026-07-15T08:31:00Z" },
    { "id": "3fa85f64-5717-4562-b3fc-2c963f66afa1", "name": "Canino", "createdAt": "2026-07-15T08:30:00Z" }
  ],
  "totalCount": 5,
  "page": 1,
  "pageSize": 10,
  "totalPages": 0
}
```

**Cómo leerla:** hay 5 especies en total y caben todas en una página de 10. Fijáte que `totalPages` llega en `0` por lo explicado en 4.3; en realidad sería 1.

### Ejemplo 2: Paginar de a 2

**Petición**

```http
GET /api/species?Page=2&PageSize=2
```

**Respuesta `200 OK`**

```json
{
  "items": [
    { "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7", "name": "Ave", "createdAt": "2026-08-12T16:45:00Z" },
    { "id": "6d8e0a1b-2c3d-4e5f-9a7b-8c9d0e1f2a11", "name": "Felino", "createdAt": "2026-07-15T08:31:00Z" }
  ],
  "totalCount": 5,
  "page": 2,
  "pageSize": 2,
  "totalPages": 0
}
```

Con 5 especies de a 2 por página hay 3 páginas (2 + 2 + 1). Calcula: `Math.ceil(5 / 2) = 3`.

### Ejemplo 3: Ordenar por nombre

**Petición**

```http
GET /api/species?Sort=name
```

**Respuesta `200 OK`**

```json
{
  "items": [
    { "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7", "name": "Ave", "createdAt": "2026-08-12T16:45:00Z" },
    { "id": "3fa85f64-5717-4562-b3fc-2c963f66afa1", "name": "Canino", "createdAt": "2026-07-15T08:30:00Z" },
    { "id": "6d8e0a1b-2c3d-4e5f-9a7b-8c9d0e1f2a11", "name": "Felino", "createdAt": "2026-07-15T08:31:00Z" },
    { "id": "9a1b2c3d-4e5f-4a6b-8c7d-0e1f2a3b4c09", "name": "Reptil", "createdAt": "2026-10-06T14:20:00Z" },
    { "id": "4b5c6d7e-8f9a-4b0c-a1d2-3e4f5a6b7c10", "name": "Roedor", "createdAt": "2026-09-20T10:00:00Z" }
  ],
  "totalCount": 5,
  "page": 1,
  "pageSize": 10,
  "totalPages": 0
}
```

### Ejemplo 4: Buscar por nombre

**Petición**

```http
GET /api/species?Search=Fel
```

**Respuesta `200 OK`**

```json
{
  "items": [
    { "id": "6d8e0a1b-2c3d-4e5f-9a7b-8c9d0e1f2a11", "name": "Felino", "createdAt": "2026-07-15T08:31:00Z" }
  ],
  "totalCount": 1,
  "page": 1,
  "pageSize": 10,
  "totalPages": 0
}
```

### Ejemplo 5: Cuando no hay resultados

**Petición**

```http
GET /api/species?Search=xyz123
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

## 7. Errores y cosas que pueden salir mal

Los mensajes de negocio se lanzan como `Exception` genérica desde el servicio y **están en inglés**. El código HTTP con el que llegan depende del middleware global de excepciones, que no está en los archivos analizados. Formato sugerido del error:

```json
{
  "message": "Species already exists"
}
```

| Situación                                             | Qué pasa                                           | Cómo evitarlo                                                |
| ----------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| No envías token o es inválido                         | `401 Unauthorized`                                 | Incluye `Authorization: Bearer <token>`                      |
| `id` con formato que no es GUID                       | `400 Bad Request`                                  | Verifica que sea un GUID completo                            |
| `id` válido pero inexistente (`GET`, `PUT`, `DELETE`) | Error `Species not found`                          | Obtén el ID desde el listado                                 |
| Crear con un nombre que ya existe                     | Error `Species already exists`                     | Revisa el listado antes de crear                             |
| `Page=0` o negativo                                   | La consulta falla (error del servidor)             | Usa `Page` mayor o igual a 1                                 |
| `PageSize=0`                                          | Resultados vacíos o error                          | Usa `PageSize` de 1 en adelante (recomendado: entre 1 y 100) |
| `Page` o `PageSize` con letras                        | `400 Bad Request`                                  | Envía solo números enteros                                   |
| `Sort` no reconocido                                  | No da error, usa el orden por defecto              | Copia el valor exacto de la sección 4.2                      |
| `PUT` con un nombre repetido                          | No da error, se guarda duplicado                   | Verifica el nombre antes de editar                           |
| `name` vacío en `POST` o `PUT`                        | No hay validación declarativa: llegará al servicio | Valida en el cliente que no esté vacío                       |

## 8. Diferencias con la API de Razas

Si también trabajas con Razas (`api/breeds`), esta tabla te ayuda a no confundirte:

| Aspecto                                 | Especies (`api/species`)               | Razas (`api/breeds`)                                       |
| --------------------------------------- | -------------------------------------- | ---------------------------------------------------------- |
| Valores de `Sort`                       | `name`, `-name`, `created`, `-created` | `name_asc`, `name_desc`, `createdAt_asc`, `createdAt_desc` |
| ¿`Sort` distingue mayúsculas?           | No                                     | Sí                                                         |
| ¿Filtros stackeables?                   | Ninguno                                | `SpeciesId` (con pipe)                                     |
| Campo `totalPages`                      | No se calcula (llega en `0`)           | Se calcula correctamente                                   |
| Respuesta de eliminar                   | `204` sin cuerpo                       | `200` con mensaje                                          |
| Idioma de los errores                   | Inglés                                 | Español                                                    |
| Endpoint de historial (`/interactions`) | No disponible                          | Disponible                                                 |
| Versión pública sin token               | No existe                              | `api/v1/breeds`                                            |

## 9. Preguntas frecuentes

**¿Hay una versión pública de Especies, sin token?** No. Todos los endpoints de este controlador requieren JWT.

**¿Dónde obtengo el GUID de una especie para filtrar razas?** En el listado de este documento (`GET /api/species`), campo `items[].id`.

**¿Puedo cambiar algo más que el nombre de una especie?** No. `UpdateSpeciesDto` solo tiene `name`.

**¿Puedo ordenar por varios campos a la vez?** No. `Sort` acepta un solo valor.

**¿Por qué `totalPages` me llega en 0 aunque haya datos?** Porque el servicio no lo calcula. Usa `Math.ceil(totalCount / pageSize)` en tu cliente.

**¿Los nombres de los parámetros distinguen mayúsculas?** No, `PageSize` y `pageSize` funcionan igual.

**¿Existe el endpoint de historial de interacciones?** No está expuesto en el controlador. Además, el método del servicio todavía lanza `NotImplementedException`.
