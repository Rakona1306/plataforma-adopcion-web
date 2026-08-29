# API Pública de Mascotas (Pets)

> ⚠️ **Nota de inferencia:** Los DTOs `PetPubFilterDto` y `PetRecommendationsFilterDto` no fueron incluidos en el código compartido. Los parámetros de query documentados a continuación se dedujeron a partir de su uso dentro de `PetPubService.cs` (métodos `ParseGenders()`, `ParseSizes()`, `ParseSpeciesIds()`, `ParseBreedIds()`, `ParseTraitIds()`, `ParseSpecieId()`, `ParsePetId()`, y las propiedades `Search`, `MinAge`, `MaxAge`, `Sort`, `Page`, `PageSize`). Si el nombre real de alguna propiedad difiere, se debe ajustar esta documentación.

**Base URL:** `https://rakona-001-site1.ktempurl.com/`

**Prefijo de todas las rutas:** `/api/v1/pets`

---

## Índice

1. [GET /api/v1/pets](#1-get-apiv1pets) — Listado paginado con filtros
2. [GET /api/v1/pets/{slug}](#2-get-apiv1petsslug) — Detalle por slug
3. [GET /api/v1/pets/recommendations](#3-get-apiv1petsrecommendations) — Recomendaciones

---

## 1. `GET /api/v1/pets`

Devuelve un listado **paginado** de mascotas **no adoptadas** (`IsAdopted == false`), aplicando filtros anatómicos/de búsqueda opcionales y un criterio de ordenamiento.

```
{{baseUrl}}/api/v1/pets
```

### Query Parameters

| Parámetro     | Tipo                     | Requerido | Descripción |
|---------------|--------------------------|:---------:|-------------|
| `Page`        | `int`                    | No*       | Número de página (usado en `Skip((Page-1)*PageSize)`). |
| `PageSize`    | `int`                    | No*       | Cantidad de elementos por página. |
| `Sort`        | `string`                 | No        | Criterio de orden. Valores soportados (ver [Valores de `Sort`](#valores-de-sort)). Si se omite o no coincide con ningún caso, se ordena por `IsRecommend` descendente. |
| `Search`       | `string`                 | No        | Búsqueda parcial e insensible a mayúsculas sobre `Name` (usa `ILIKE '%valor%'`). |
| `Genders`      | `int[]` (CSV o repetido) | No        | Lista de valores del enum `PetGender`. Filtra `x.Gender` dentro de la lista. |
| `Sizes`        | `int[]` (CSV o repetido) | No        | Lista de valores del enum `PetSize`. Filtra `x.Size` dentro de la lista. |
| `SpeciesIds`   | `Guid[]` (CSV o repetido)| No        | Filtra por `x.SpeciesId` dentro de la lista. |
| `BreedIds`     | `Guid[]` (CSV o repetido)| No        | Filtra mascotas que tengan **al menos una** raza (`PetBreeds`) dentro de la lista. |
| `MinAge`       | `int`                    | No        | Edad mínima (`x.Age >= MinAge`). |
| `MaxAge`       | `int`                    | No        | Edad máxima (`x.Age <= MaxAge`). |

`*` `Page` y `PageSize` no tienen validación explícita en el servicio mostrado, pero son obligatorios funcionalmente para paginar correctamente (si `PageSize` es `0` o no se envía, `TotalPages` se calcula como `0`).

> Los nombres exactos de los query params (`Genders`, `Sizes`, `SpeciesIds`, `BreedIds`) dependen de cómo estén nombradas las propiedades públicas en `PetPubFilterDto` — aquí se usa el nombre más probable dado el método `Parse...()` correspondiente (p. ej. `ParseGenders()` → `Genders`).

### Valores de `Sort`

| Valor            | Efecto |
|-------------------|--------|
| *(vacío / nulo)*  | `OrderByDescending(IsRecommend)` |
| `recommended`     | `OrderByDescending(IsRecommend)` |
| `name_asc`        | `OrderBy(Name)` |
| `name_desc`        | `OrderByDescending(Name)` |
| *(cualquier otro)* | `OrderByDescending(IsRecommend)` (fallback) |

> `Sort` no distingue mayúsculas/minúsculas ni espacios extremos (`ToLower().Trim()`).

### Ejemplo de request

```
GET {{baseUrl}}/api/v1/pets?Page=1&PageSize=10&Sort=name_asc&Search=luna&Genders=0&Sizes=1,2&MinAge=1&MaxAge=5
```

### Respuesta — `200 OK`

Objeto `Paginate<PetPubResponse>`:

```json
{
  "items": [ /* array de PetPubResponse, ver estructura abajo */ ],
  "totalCount": 42,
  "page": 1,
  "pageSize": 10,
  "totalPages": 5
}
```

| Campo         | Tipo                    | Descripción |
|---------------|-------------------------|-------------|
| `items`       | `PetPubResponse[]`      | Elementos de la página actual. |
| `totalCount`  | `int`                   | Total de registros que cumplen los filtros (sin paginar). |
| `page`        | `int`                   | Página solicitada. |
| `pageSize`    | `int`                   | Tamaño de página solicitado. |
| `totalPages`  | `int`                   | `ceil(totalCount / pageSize)`. `0` si `pageSize <= 0`. |

Ver estructura completa de `PetPubResponse` en la [sección compartida](#estructura-petpubresponse) al final del documento.

---

## 2. `GET /api/v1/pets/{slug}`

Devuelve el detalle de **una** mascota buscada por su `slug` único.

```
{{baseUrl}}/api/v1/pets/{slug}
```

### Path Parameters

| Parámetro | Tipo     | Requerido | Descripción |
|-----------|----------|:---------:|-------------|
| `slug`    | `string` | Sí        | Slug de la mascota (ej. `luna-golden-retriever`). |

> ⚠️ Este endpoint **no** filtra por `IsAdopted`, a diferencia del listado paginado — puede devolver mascotas ya adoptadas.

### Ejemplo de request

```
GET {{baseUrl}}/api/v1/pets/luna-golden-retriever
```

### Respuesta — `200 OK`

- Si se encuentra: objeto `PetPubResponse` (ver [estructura](#estructura-petpubresponse)).
- Si **no** se encuentra: el controlador igual responde `200 OK` con body `null`, ya que el servicio retorna `null` y el controlador hace `return Ok(result)` sin validar. **No se retorna `404`.**

```json
null
```

> 💡 Sugerencia: si se desea un `404 Not Found` cuando no existe el slug, habría que agregar esa validación en el controlador (`PetsPubController.GetBySlug`).

---

## 3. `GET /api/v1/pets/recommendations`

Devuelve una lista de mascotas recomendadas, con una **cascada de criterios** de filtrado: se evalúa `SpecieId` primero; si no fue enviado, se evalúa `BreedIds`; si tampoco, `TraitIds`; si ninguno fue enviado, se devuelven las recomendadas en general (`IsRecommend` descendente). No es paginado (no retorna `totalCount`), solo aplica `Take(PageSize)`.

```
{{baseUrl}}/api/v1/pets/recommendations
```

### Query Parameters

| Parámetro   | Tipo      | Requerido | Descripción |
|-------------|-----------|:---------:|-------------|
| `PetId`     | `Guid`    | No        | Si se envía, excluye esa mascota de los resultados (`x.Id != PetId`). Útil para no recomendar la misma ficha que se está viendo. |
| `SpecieId`  | `Guid`    | No        | Si se envía, filtra por especie (`x.SpeciesId == SpecieId`) y **tiene prioridad sobre `BreedIds` y `TraitIds`**. |
| `BreedIds`  | `Guid[]`  | No        | Se evalúa **solo si `SpecieId` no fue enviado**. Filtra mascotas con al menos una raza dentro de la lista. |
| `TraitIds`  | `Guid[]`  | No        | Se evalúa **solo si `SpecieId` y `BreedIds` no fueron enviados**. Filtra mascotas con al menos un rasgo dentro de la lista. |
| `PageSize`  | `int`     | No        | Cantidad máxima de resultados a devolver (`Take(PageSize)`). |

> ⚠️ Importante: **no es un OR combinado**, es una jerarquía "si A no vino, probar B; si B no vino, probar C". Enviar `SpecieId` y `BreedIds` juntos hace que `BreedIds` sea **ignorado**.

> Este endpoint tampoco filtra `IsAdopted`.

### Orden de resultados

En todos los casos se ordena por `IsRecommend` descendente antes de recortar con `Take(PageSize)`.

### Ejemplo de request

```
GET {{baseUrl}}/api/v1/pets/recommendations?SpecieId=3fa85f64-5717-4562-b3fc-2c963f66afa6&PetId=9c858901-8a57-4791-81fe-4c455b099bc9&PageSize=4
```

### Respuesta — `200 OK`

Array de `PetPubResponse` (**sin** envoltorio de paginación):

```json
[
  { /* PetPubResponse */ },
  { /* PetPubResponse */ }
]
```

---

## Estructura `PetPubResponse`

Estructura común retornada (directamente o dentro de `items`) por los tres endpoints.

| Campo           | Tipo                        | Descripción |
|-----------------|-----------------------------|-------------|
| `id`            | `Guid`                      | Identificador único. |
| `name`          | `string`                    | Nombre de la mascota. |
| `description`   | `string \| null`            | Descripción general. |
| `rescueStory`   | `string \| null`            | Historia de rescate. |
| `birthDate`     | `DateOnly \| null`          | Fecha de nacimiento (`yyyy-MM-dd`). |
| `weightKg`      | `decimal \| null`           | Peso en kilogramos. |
| `age`           | `int`                       | Edad. |
| `slug`          | `string`                    | Slug único. Si la entidad no tiene uno persistido, se genera al vuelo a partir de `Name` (ver [Generación de `slug`](#generación-de-slug)). |
| `isVaccinated`  | `bool`                      | Si está vacunado. |
| `isSterilized`  | `bool`                      | Si está esterilizado. |
| `isAdopted`     | `bool`                      | Si ya fue adoptado. |
| `gender`        | `EnumResponse`              | `{ key: int, value: string }` — valor del enum `PetGender`. |
| `size`          | `EnumResponse`              | `{ key: int, value: string }` — valor del enum `PetSize`. |
| `status`        | `EnumResponse`              | `{ key: int, value: string }` — estado de la mascota. |
| `specie`        | `SpeciePubResponse`         | `{ id: Guid, name: string }`. |
| `breeds`        | `OptionBreedResponse[]`     | `{ id: Guid, name: string }[]`. |
| `traits`        | `OptionTraitResponse[]`     | `{ id: Guid, name: string }[]`. |
| `photoUrls`     | `OptionPetPhotoResponse[]`  | `{ id: Guid, url: string }[]`. |
| `vaccines`      | `VaccineRelationResponse[]` | `{ id: Guid, name: string }[]`. |

### Ejemplo de objeto `PetPubResponse`

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Luna",
  "description": "Perrita muy juguetona y cariñosa.",
  "rescueStory": "Fue encontrada abandonada cerca del parque.",
  "birthDate": "2022-05-10",
  "weightKg": 12.5,
  "age": 3,
  "slug": "luna",
  "isVaccinated": true,
  "isSterilized": true,
  "isAdopted": false,
  "gender": { "key": 0, "value": "Female" },
  "size": { "key": 1, "value": "Medium" },
  "status": { "key": 0, "value": "Available" },
  "specie": {
    "id": "9c858901-8a57-4791-81fe-4c455b099bc9",
    "name": "Perro"
  },
  "breeds": [
    { "id": "b1a2c3d4-0000-0000-0000-000000000001", "name": "Golden Retriever" }
  ],
  "traits": [
    { "id": "t1a2c3d4-0000-0000-0000-000000000001", "name": "Juguetón" }
  ],
  "photoUrls": [
    { "id": "p1a2c3d4-0000-0000-0000-000000000001", "url": "https://cdn.example.com/pets/luna1.jpg" }
  ],
  "vaccines": [
    { "id": "v1a2c3d4-0000-0000-0000-000000000001", "name": "Rabia" }
  ]
}
```

### Generación de `slug`

Si la entidad no tiene `Slug` guardado en base de datos, se genera dinámicamente a partir de `Name` con la siguiente lógica (`SlugParser`):

1. Convertir a minúsculas y hacer `trim()`.
2. Eliminar todo carácter que no sea letra, número, espacio o guion (`[^\w\s-]`).
3. Reemplazar espacios por guiones (`-`).
4. Colapsar guiones dobles (`--`) en uno solo.
5. Quitar guiones al inicio/final.

Ejemplo: `"Luna  Rescatada!"` → `"luna-rescatada"`.

> ⚠️ Este slug generado **no se persiste**, por lo que si se llama de nuevo a `GetBySlug` con ese valor, funcionará solo si el `Name` no cambió y no hay colisión con otro pet sin slug persistido.

---

## Notas generales de comportamiento

- **`GET /api/v1/pets`** es el único endpoint que excluye explícitamente mascotas adoptadas (`!x.IsAdopted`). Los otros dos (`GetBySlug` y `GetRecommendations`) **no** aplican ese filtro.
- Todas las respuestas usan `AsNoTracking()` — son solo lectura, no hay tracking de cambios de EF Core.
- Las relaciones incluidas siempre son las mismas (`ApplyIncludes`): `PetBreeds.Breed`, `PetTraits.Trait`, `Photos`, `Species`, `PetVaccines.Vaccine`.
- No se documentan aquí respuestas de error (`400`/`404`/`500`) porque el código compartido no implementa manejo explícito de errores en el controlador — todo pasa por `return Ok(result)`.