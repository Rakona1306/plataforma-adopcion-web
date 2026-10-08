# Documentación de API: Módulo de Razas (Breeds)

Ruta base `api/breeds` · Autenticación JWT obligatoria en todos los endpoints · Actualizado el 2026-10-06

## 1. Resumen de endpoints

| #   | Método   | Ruta                           | Descripción                                        | Auth  | Respuesta exitosa               |
| --- | -------- | ------------------------------ | -------------------------------------------------- | :---: | ------------------------------- |
| 1   | `GET`    | `api/breeds`                   | Lista paginada y filtrable de razas                |  Sí   | `200` `Paginate<BreedResponse>` |
| 2   | `GET`    | `api/breeds/{id}`              | Obtiene una raza por ID                            |  Sí   | `200` `BreedResponse`           |
| 3   | `POST`   | `api/breeds`                   | Crea una raza                                      |  Sí   | `200` `BreedResponse`           |
| 4   | `PUT`    | `api/breeds/{id}`              | Actualiza una raza                                 |  Sí   | `200` `BreedResponse`           |
| 5   | `DELETE` | `api/breeds/{id}`              | Elimina una raza                                   |  Sí   | `200` `{ message }`             |
| 6   | `GET`    | `api/breeds/{id}/interactions` | Historial de interacciones (auditoría) de una raza |  Sí   | `200` paginado                  |

## 2. Autenticación

El controlador completo está decorado con `[AuthorizeJwt]`, por lo que **todos los endpoints, incluidos los GET, requieren token**. Envía el JWT en la cabecera:

```http
Authorization: Bearer <tu_token_jwt>
Content-Type: application/json
```

Si el token es inválido o no se resuelve el usuario, los endpoints de escritura (`POST`, `PUT`, `DELETE`) responden:

```json
// 401 Unauthorized
{
  "message": "Usuario no autorizado"
}
```

## 3. Convenciones generales

| Aspecto         | Valor                                                                               |
| --------------- | ----------------------------------------------------------------------------------- |
| Formato         | JSON, propiedades en `camelCase`                                                    |
| Identificadores | `Guid` (UUID v4), ej. `3fa85f64-5717-4562-b3fc-2c963f66afa6`                        |
| Fechas          | ISO 8601 en UTC, ej. `2026-09-24T10:00:00Z`                                         |
| Textos          | Idioma de los mensajes de error: español                                            |
| Auditoría       | Crear, actualizar y eliminar registran el `userId` del token en el log de auditoría |

## 4. Modelos

### 4.1 BreedResponse

| Campo         | Tipo       | Descripción                              |
| ------------- | ---------- | ---------------------------------------- |
| `id`          | `Guid`     | Identificador único de la raza           |
| `name`        | `string`   | Nombre de la raza                        |
| `speciesId`   | `Guid`     | ID de la especie a la que pertenece      |
| `speciesName` | `string`   | Nombre de la especie (resuelto por join) |
| `createdAt`   | `DateTime` | Fecha de creación (UTC)                  |

### 4.2 Paginate\<T>

Envoltorio de todas las respuestas paginadas.

| Campo        | Tipo      | Descripción                                            |
| ------------ | --------- | ------------------------------------------------------ |
| `items`      | `T[]`     | Elementos de la página actual                          |
| `totalCount` | `integer` | Total de registros que cumplen el filtro (sin paginar) |
| `page`       | `integer` | Página actual                                          |
| `pageSize`   | `integer` | Tamaño de página usado                                 |
| `totalPages` | `integer` | Total de páginas. Es `0` si no hay resultados          |

### 4.3 CreateBreedDto / UpdateBreedDto

Ambos DTOs tienen la misma estructura.

| Campo       | Tipo     | Requerido | Descripción               | Reglas de negocio                                                         |
| ----------- | -------- | :-------: | ------------------------- | ------------------------------------------------------------------------- |
| `name`      | `string` |    Sí     | Nombre de la raza         | Único (sin distinguir mayúsculas/minúsculas) al crear. Error si ya existe |
| `speciesId` | `Guid`   |    Sí     | ID de la especie asociada | La especie debe existir. Error si no se encuentra                         |

### 4.4 BreedFilterDto (query string)

| Parámetro   | Tipo      |     Default      | Stackeable | Descripción                                                                                       |
| ----------- | --------- | :--------------: | :--------: | ------------------------------------------------------------------------------------------------- |
| `Page`      | `integer` |       `1`        |     No     | Número de página (base 1)                                                                         |
| `PageSize`  | `integer` |       `10`       |     No     | Cantidad de elementos por página                                                                  |
| `Search`    | `string`  |        —         |     No     | Búsqueda parcial por nombre, sin distinguir mayúsculas/minúsculas (`ILIKE %texto%`)               |
| `SpeciesId` | `string`  |        —         |   **Sí**   | Uno o varios `Guid` de especie separados por el carácter pipe. Aplica filtro OR entre los valores |
| `Sort`      | `string`  | `createdAt_desc` |     No     | Criterio de ordenamiento (ver tabla 4.5)                                                          |

**Keys stackeables:** únicamente `SpeciesId`. Se acumulan en **un solo parámetro**, separando los GUID con el carácter pipe (en la URL se codifica como `%7C`). No se repite la key.

```text
Correcto:   GET api/breeds?SpeciesId=<guid1>%7C<guid2>
Incorrecto: GET api/breeds?SpeciesId=<guid1>&SpeciesId=<guid2>
```

Reglas del parser de `SpeciesId`:

- Los espacios alrededor de cada valor se recortan.
- Los valores vacíos se ignoran.
- Los valores que no son un GUID válido se ignoran **sin devolver error**.
- Si ningún valor es un GUID válido, el filtro no se aplica y se devuelven todas las razas.
- Entre varios GUID se aplica **OR**: devuelve razas de cualquiera de esas especies.
- Entre filtros distintos (`Search` + `SpeciesId`) se aplica **AND**.

### 4.5 Valores de `Sort`

| Valor                                             | Orden       | Descripción                        |
| ------------------------------------------------- | ----------- | ---------------------------------- |
| `name_asc`                                        | Ascendente  | Nombre de A a Z                    |
| `name_desc`                                       | Descendente | Nombre de Z a A                    |
| `createdAt_asc`                                   | Ascendente  | Más antiguas primero               |
| `createdAt_desc` (o cualquier otro valor / vacío) | Descendente | **Default.** Más recientes primero |

Los valores se comparan de forma exacta y **sensible a mayúsculas** (`createdAt_asc`, no `createdat_asc`). Cualquier valor no reconocido cae en el orden por defecto.

### 4.6 OptionBreedResponse

DTO ligero pensado para selects/dropdowns. **No está expuesto por ningún endpoint del controlador actual.**

| Campo  | Tipo     | Descripción       |
| ------ | -------- | ----------------- |
| `id`   | `Guid`   | ID de la raza     |
| `name` | `string` | Nombre de la raza |

## 5. Endpoints

### 5.1 Listar razas (paginado y filtrado)

- **Método:** `GET`
- **Ruta:** `api/breeds`
- **Auth:** `Authorization: Bearer <token>`
- **Query params:** ver sección 4.4

**Ejemplos de petición**

```http
# Primera página con valores por defecto
GET /api/breeds

# Buscar "lab", ordenar por nombre, 2 por página
GET /api/breeds?Search=lab&Sort=name_asc&Page=1&PageSize=2

# Filtrar por varias especies (stack con pipe)
GET /api/breeds?SpeciesId=3fa85f64-5717-4562-b3fc-2c963f66afa1%7C7c9e6679-7425-40de-944b-e07fc1f90ae7
```

**Respuesta `200 OK`** (`Page=1`, `PageSize=2`, `Sort=name_asc`)

```json
{
  "items": [
    {
      "id": "b1a7f3c2-9d4e-4c8a-8f10-2a6e5d7c1b01",
      "name": "Beagle",
      "speciesId": "3fa85f64-5717-4562-b3fc-2c963f66afa1",
      "speciesName": "Canino",
      "createdAt": "2026-08-14T15:32:10Z"
    },
    {
      "id": "c4e8d2a1-6b3f-4f7e-9a21-5d8b7e3f2c02",
      "name": "Labrador Retriever",
      "speciesId": "3fa85f64-5717-4562-b3fc-2c963f66afa1",
      "speciesName": "Canino",
      "createdAt": "2026-09-02T09:15:44Z"
    }
  ],
  "totalCount": 5,
  "page": 1,
  "pageSize": 2,
  "totalPages": 3
}
```

**Respuesta sin resultados `200 OK`**

```json
{
  "items": [],
  "totalCount": 0,
  "page": 1,
  "pageSize": 10,
  "totalPages": 0
}
```

### 5.2 Obtener raza por ID

- **Método:** `GET`
- **Ruta:** `api/breeds/{id}`
- **Auth:** `Authorization: Bearer <token>`
- **Parámetros de ruta:** `id` (`Guid`). La ruta tiene restricción `:guid`, por lo que un valor que no sea GUID devuelve `404` desde el router

**Respuesta `200 OK`**

```json
{
  "id": "c4e8d2a1-6b3f-4f7e-9a21-5d8b7e3f2c02",
  "name": "Labrador Retriever",
  "speciesId": "3fa85f64-5717-4562-b3fc-2c963f66afa1",
  "speciesName": "Canino",
  "createdAt": "2026-09-02T09:15:44Z"
}
```

**Error si no existe:** el servicio lanza una excepción con el mensaje `La raza no fue encontrada`.

### 5.3 Crear raza

- **Método:** `POST`
- **Ruta:** `api/breeds`
- **Auth:** `Authorization: Bearer <token>`
- **Content-Type:** `application/json`

**Body (`CreateBreedDto`)**

```json
{
  "name": "Golden Retriever",
  "speciesId": "3fa85f64-5717-4562-b3fc-2c963f66afa1"
}
```

**Validaciones del servicio (en orden)**

1. La especie indicada en `speciesId` debe existir → si no: `La especie no fue encontrada`.
2. No debe existir otra raza con el mismo nombre (comparación sin distinguir mayúsculas) → si existe: `La raza ya existe`.

La unicidad del nombre es **global**, no por especie.

**Respuesta `200 OK`** (retorna la raza creada con su ID generado)

```json
{
  "id": "e5f9a3b7-1c2d-4e6f-8a9b-0c1d2e3f4a05",
  "name": "Golden Retriever",
  "speciesId": "3fa85f64-5717-4562-b3fc-2c963f66afa1",
  "speciesName": "Canino",
  "createdAt": "2026-10-06T14:20:00Z"
}
```

### 5.4 Actualizar raza

- **Método:** `PUT`
- **Ruta:** `api/breeds/{id}`
- **Auth:** `Authorization: Bearer <token>`
- **Parámetros de ruta:** `id` (`Guid`) de la raza a actualizar

**Body (`UpdateBreedDto`)**

```json
{
  "name": "Golden Retriever Inglés",
  "speciesId": "3fa85f64-5717-4562-b3fc-2c963f66afa1"
}
```

**Validaciones del servicio (en orden)**

1. La raza debe existir → si no: `La raza no fue encontrada`.
2. La especie debe existir → si no: `La especie no fue encontrada`.

El endpoint es un reemplazo completo: ambos campos son obligatorios. Se registran en auditoría los valores anteriores (`name`, `speciesId`).

**Respuesta `200 OK`**

```json
{
  "id": "e5f9a3b7-1c2d-4e6f-8a9b-0c1d2e3f4a05",
  "name": "Golden Retriever Inglés",
  "speciesId": "3fa85f64-5717-4562-b3fc-2c963f66afa1",
  "speciesName": "Canino",
  "createdAt": "2026-10-06T14:20:00Z"
}
```

### 5.5 Eliminar raza

- **Método:** `DELETE`
- **Ruta:** `api/breeds/{id}`
- **Auth:** `Authorization: Bearer <token>`
- **Parámetros de ruta:** `id` (`Guid`)

**Respuesta `200 OK`** (devuelve cuerpo con mensaje, no `204`)

```json
{
  "message": "Raza eliminada correctamente"
}
```

**Error si no existe:** `La raza no fue encontrada`.

### 5.6 Historial de interacciones

- **Método:** `GET`
- **Ruta:** `api/breeds/{id}/interactions`
- **Auth:** `Authorization: Bearer <token>`
- **Parámetros de ruta:** `id` (`Guid`)

| Parámetro  | Tipo      | Default | Stackeable | Descripción          |
| ---------- | --------- | :-----: | :--------: | -------------------- |
| `page`     | `integer` |   `1`   |     No     | Número de página     |
| `pageSize` | `integer` |  `10`   |     No     | Elementos por página |

**Ejemplo de petición**

```http
GET /api/breeds/c4e8d2a1-6b3f-4f7e-9a21-5d8b7e3f2c02/interactions?page=1&pageSize=10
```

**Respuesta `200 OK`** (mock). La estructura exacta proviene de `BaseService.GetInteractionsAsync`, que no se incluyó en los archivos; ajusta los campos a tu `AuditLog` real.

```json
{
  "items": [
    {
      "id": "a0b1c2d3-e4f5-4a6b-8c7d-9e0f1a2b3c06",
      "action": "Update",
      "entityId": "c4e8d2a1-6b3f-4f7e-9a21-5d8b7e3f2c02",
      "userId": "9d8c7b6a-5e4f-4d3c-b2a1-0f9e8d7c6b05",
      "oldValues": { "name": "Labrador", "speciesId": "3fa85f64-5717-4562-b3fc-2c963f66afa1" },
      "createdAt": "2026-09-10T11:05:00Z"
    }
  ],
  "totalCount": 1,
  "page": 1,
  "pageSize": 10,
  "totalPages": 1
}
```

## 6. Errores

Los mensajes de negocio se lanzan como `Exception` genérica desde el servicio. El código HTTP final depende del middleware global de manejo de excepciones, que no está en los archivos analizados. Mock sugerido del formato de error:

```json
{
  "message": "La raza ya existe"
}
```

| Mensaje                        | Se produce en               | Causa                                            |
| ------------------------------ | --------------------------- | ------------------------------------------------ |
| `Usuario no autorizado`        | `POST`, `PUT`, `DELETE`     | No se pudo resolver el usuario del token (`401`) |
| `La raza no fue encontrada`    | `GET {id}`, `PUT`, `DELETE` | El `id` no existe                                |
| `La especie no fue encontrada` | `POST`, `PUT`               | El `speciesId` no existe                         |
| `La raza ya existe`            | `POST`                      | Ya hay una raza con ese nombre                   |

## 7. Notas y comportamientos a tener en cuenta

- **Paginación sin validación:** `Page` y `PageSize` no tienen límites. `Page <= 0` genera un `Skip` negativo y `PageSize = 0` rompe el cálculo de `totalPages`. Se recomienda validar en el cliente (`Page >= 1`, `PageSize` entre 1 y 100) o agregar validación en el DTO.
- **DTOs sin validación declarativa:** `name` y `speciesId` no tienen `[Required]` ni longitud máxima. Un `name` vacío o un `speciesId` en `00000000-0000-0000-0000-000000000000` llegará al servicio (este último fallará con `La especie no fue encontrada`).
- **Unicidad en `PUT`:** al actualizar no se verifica que el nuevo `name` esté duplicado, por lo que es posible crear nombres repetidos mediante actualización.
- **Códigos de estado:** crear devuelve `200` (no `201`) y eliminar devuelve `200` con mensaje (no `204`).
- **Autenticación en lecturas:** a diferencia de otros módulos con lectura pública, aquí también los `GET` requieren JWT.
- **Nombre del parámetro de filtro:** el binding de ASP.NET no distingue mayúsculas, así que `SpeciesId` y `speciesId` funcionan igual. Nota que en Pets el parámetro se documenta como `SpecieId`; aquí es `SpeciesId`.
