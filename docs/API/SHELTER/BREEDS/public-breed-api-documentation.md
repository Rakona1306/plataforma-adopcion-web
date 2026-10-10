# Documentación de API Pública: Razas (Breeds)

Ruta base `api/v1/breeds` · **No requiere autenticación** · Solo lectura · Actualizado el 2026-10-06

## 1. ¿De qué trata este documento?

Esta API pública permite **consultar la lista de razas de animales** (por ejemplo: Labrador, Beagle, Siamés) que existen en el sistema del refugio. Cualquier persona o aplicación (una web, una app móvil, Postman) puede usarla **sin iniciar sesión**.

Solo existe **un endpoint** y solo sirve para **leer** datos. No se puede crear, editar ni borrar razas desde aquí (eso se hace en la API privada).


## 2. Endpoint: Listar razas

- **Método:** `GET`
- **URL completa de ejemplo:** `https://tu-dominio.com/api/v1/breeds`
- **Cabeceras necesarias:** ninguna especial. No necesitas `Authorization`.

### 2.1 Parámetros que puedes enviar

Todos son **opcionales**. Si no envías ninguno, la API devuelve la primera página con 10 razas, de la más reciente a la más antigua.

| Parámetro  | Tipo          | Valor por defecto | ¿Stackeable? | ¿Para qué sirve?                                                                                |
| ---------- | ------------- | :---------------: | :----------: | ----------------------------------------------------------------------------------------------- |
| `Page`     | número entero |        `1`        |      No      | Qué página quieres ver. Empieza en 1.                                                           |
| `PageSize` | número entero |       `10`        |      No      | Cuántas razas quieres por página.                                                               |
| `Search`   | texto         |      (vacío)      |      No      | Busca razas cuyo nombre **contenga** ese texto. No importa si escribes mayúsculas o minúsculas. |
| `SpecieId` | texto (GUIDs) |      (vacío)      |    **Sí**    | Muestra solo razas de la(s) especie(s) indicada(s).                                             |
| `Sort`     | texto         | `createdAt_desc`  |      No      | Cómo ordenar los resultados (ver 3.2).                                                          |

> **Ojo con el nombre:** en este endpoint público el parámetro se llama `SpecieId` (sin la "s" de Species). En la API privada se llama `SpeciesId`. No los confundas.

### 2.2 Valores válidos para `Sort`

| Valor                                              | ¿Qué hace?                                                    |
| -------------------------------------------------- | ------------------------------------------------------------- |
| `name_asc`                                         | Orden alfabético de la A a la Z                               |
| `name_desc`                                        | Orden alfabético de la Z a la A                               |
| `createdAt_asc`                                    | Las razas más antiguas primero                                |
| `createdAt_desc` (o cualquier otro valor, o vacío) | Las razas más recientes primero. **Es el orden por defecto.** |

Importante: escribe el valor **exactamente** como aparece en la tabla, respetando mayúsculas y minúsculas. `createdAt_asc` funciona, pero `createdat_asc` **no**: la API lo ignora y usa el orden por defecto, sin avisarte con error.

### 2.3 Respuesta exitosa (`200 OK`)

La API devuelve un objeto con la lista de razas y datos para armar la paginación.

| Campo          | Tipo   | ¿Qué contiene?                                                           |
| -------------- | ------ | ------------------------------------------------------------------------ |
| `items`        | lista  | Las razas de la página pedida                                            |
| `items[].id`   | GUID   | Identificador único de la raza                                           |
| `items[].name` | texto  | Nombre de la raza                                                        |
| `totalCount`   | número | Cantidad **total** de razas que cumplen tu filtro (en todas las páginas) |
| `page`         | número | La página actual                                                         |
| `pageSize`     | número | El tamaño de página usado                                                |
| `totalPages`   | número | Cantidad total de páginas. Si no hay resultados vale `0`                 |

En este endpoint público cada raza solo trae `id` y `name`. No incluye el nombre de la especie ni la fecha de creación (esos datos solo salen en la API privada).

## 3. ¿Qué filtro es stackeable y cómo se usa?

Solo `SpecieId` es stackeable. Esto significa que puedes pedir razas de **varias especies en la misma petición**.

### La regla de oro

No repitas el parámetro. Pon todos los GUID **en un solo `SpecieId`, separados por pipe**.

```text
✅ Correcto:
GET /api/v1/breeds?SpecieId=GUID_PERROS%7CGUID_GATOS

❌ Incorrecto (la API solo tomará en cuenta uno):
GET /api/v1/breeds?SpecieId=GUID_PERROS&SpecieId=GUID_GATOS
```

Con un ejemplo con GUID reales:

```text
GET /api/v1/breeds?SpecieId=3fa85f64-5717-4562-b3fc-2c963f66afa1%7C7c9e6679-7425-40de-944b-e07fc1f90ae7
```

### ¿Cómo se combinan los filtros?

- **Varios valores dentro de `SpecieId`** → funcionan como **"O"**. Devuelve razas de la especie A **o** de la especie B.
- **Filtros distintos entre sí** (`Search` + `SpecieId`) → funcionan como **"Y"**. Devuelve razas que cumplan **ambas** condiciones.

### Qué pasa con valores inválidos

La API es "permisiva" con `SpecieId` y **no devuelve error**:

| Si envías...                                  | La API hace...                                     |
| --------------------------------------------- | -------------------------------------------------- |
| Un valor que no es un GUID válido (ej. `abc`) | Lo ignora                                          |
| Espacios alrededor de un GUID                 | Los quita                                          |
| Valores vacíos entre pipes                    | Los ignora                                         |
| Solo valores inválidos                        | No aplica el filtro y devuelve **todas** las razas |

Si esperabas resultados filtrados y llegan todas las razas, revisa que tus GUID estén bien escritos.

## 4. Ejemplos paso a paso

### Ejemplo 1: Pedir todas las razas (sin filtros)

**Petición**

```http
GET /api/v1/breeds
```

**Respuesta `200 OK`** (mock con 12 razas en total en el sistema)

```json
{
  "items": [
    { "id": "e5f9a3b7-1c2d-4e6f-8a9b-0c1d2e3f4a05", "name": "Golden Retriever" },
    { "id": "c4e8d2a1-6b3f-4f7e-9a21-5d8b7e3f2c02", "name": "Labrador Retriever" },
    { "id": "b1a7f3c2-9d4e-4c8a-8f10-2a6e5d7c1b01", "name": "Beagle" }
  ],
  "totalCount": 12,
  "page": 1,
  "pageSize": 10,
  "totalPages": 2
}
```

Nota: arriba se muestran solo 3 elementos para acortar el ejemplo. En la respuesta real `items` traería hasta 10, porque `pageSize` es 10.

**Cómo leerla:** hay 12 razas en total (`totalCount`), se muestran de a 10 por página, así que hay 2 páginas (`totalPages`). Estás viendo la página 1.

### Ejemplo 2: Pedir la siguiente página

**Petición**

```http
GET /api/v1/breeds?Page=2
```

**Respuesta `200 OK`**

```json
{
  "items": [
    { "id": "a7d3c1e9-2b4f-4a6c-9d8e-1f0a2b3c4d07", "name": "Poodle" },
    { "id": "f2b6e4d8-3c5a-4b7d-8e9f-2a1b3c4d5e08", "name": "Siamés" }
  ],
  "totalCount": 12,
  "page": 2,
  "pageSize": 10,
  "totalPages": 2
}
```

Como hay 12 razas y la página 1 mostró 10, a la página 2 le quedan solo 2.

### Ejemplo 3: Buscar por nombre y ordenar

Quiero razas que contengan "re" ordenadas de la A a la Z, de a 5 por página.

**Petición**

```http
GET /api/v1/breeds?Search=re&Sort=name_asc&PageSize=5
```

**Respuesta `200 OK`**

```json
{
  "items": [
    { "id": "e5f9a3b7-1c2d-4e6f-8a9b-0c1d2e3f4a05", "name": "Golden Retriever" },
    { "id": "c4e8d2a1-6b3f-4f7e-9a21-5d8b7e3f2c02", "name": "Labrador Retriever" }
  ],
  "totalCount": 2,
  "page": 1,
  "pageSize": 5,
  "totalPages": 1
}
```

### Ejemplo 4: Filtrar por varias especies a la vez

Quiero razas de perros y de gatos juntas.

**Petición**

```http
GET /api/v1/breeds?SpecieId=3fa85f64-5717-4562-b3fc-2c963f66afa1%7C7c9e6679-7425-40de-944b-e07fc1f90ae7
```

**Respuesta `200 OK`**

```json
{
  "items": [
    { "id": "f2b6e4d8-3c5a-4b7d-8e9f-2a1b3c4d5e08", "name": "Siamés" },
    { "id": "b1a7f3c2-9d4e-4c8a-8f10-2a6e5d7c1b01", "name": "Beagle" }
  ],
  "totalCount": 2,
  "page": 1,
  "pageSize": 10,
  "totalPages": 1
}
```

### Ejemplo 5: Cuando no hay resultados

**Petición**

```http
GET /api/v1/breeds?Search=xyz123
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

## 6. Errores y cosas que pueden salir mal

Este endpoint casi nunca devuelve errores de negocio, pero hay casos a vigilar:

| Situación                                                | Qué pasa                                                                      | Cómo evitarlo                                                |
| -------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `Page=0` o un número negativo                            | La consulta falla (error del servidor)                                        | Usa siempre `Page` mayor o igual a 1                         |
| `PageSize=0`                                             | Falla el cálculo de páginas                                                   | Usa `PageSize` de 1 en adelante (recomendado: entre 1 y 100) |
| `Page` o `PageSize` con letras (ej. `Page=abc`)          | La API responde `400 Bad Request` porque no puede convertir el valor a número | Envía solo números enteros                                   |
| `Sort` escrito distinto a la tabla                       | No da error, usa el orden por defecto                                         | Copia el valor exacto de la sección 3.2                      |
| `SpecieId` con GUID mal escritos                         | No da error, ignora esos valores                                              | Valida los GUID antes de enviarlos                           |
| Pasar `SpecieId` repetido (`&SpecieId=...&SpecieId=...`) | Solo se usa uno de los valores                                                | Usa un solo `SpecieId` con pipe                              |

## 7. Diferencias con la API privada de razas

Si también trabajas con la API privada (`api/breeds`), esta tabla te ayuda a no confundirte:

| Aspecto                      | API pública                                      | API privada                                             |
| ---------------------------- | ------------------------------------------------ | ------------------------------------------------------- |
| Ruta                         | `api/v1/breeds`                                  | `api/breeds`                                            |
| ¿Requiere token JWT?         | No                                               | Sí                                                      |
| Operaciones                  | Solo listar (`GET`)                              | Listar, ver detalle, crear, editar, eliminar, historial |
| Nombre del filtro de especie | `SpecieId`                                       | `SpeciesId`                                             |
| Campos por raza              | `id`, `name`                                     | `id`, `name`, `speciesId`, `speciesName`, `createdAt`   |
| Filtros disponibles          | `Page`, `PageSize`, `Search`, `SpecieId`, `Sort` | `Page`, `PageSize`, `Search`, `SpeciesId`, `Sort`       |

## 8. Preguntas frecuentes

**¿Necesito registrarme o enviar un token?** No. Este endpoint es público.

**¿De dónde saco el GUID de una especie para usar en `SpecieId`?** Debes obtenerlo del endpoint de especies del sistema. Esta documentación solo cubre razas.

**¿Por qué me devuelve `200` aunque no haya resultados?** Porque la petición fue correcta; simplemente ninguna raza cumplió el filtro. Revisa que `items` esté vacío y `totalCount` sea `0`.

**¿La búsqueda distingue mayúsculas?** No. `lab`, `LAB` y `Lab` dan el mismo resultado. Además busca coincidencias parciales en cualquier parte del nombre.

**¿Puedo ordenar por varios campos a la vez?** No. `Sort` acepta un solo valor.

**¿Los nombres de los parámetros distinguen mayúsculas?** No, `SpecieId` y `specieId` funcionan igual. Lo que sí distingue mayúsculas son los **valores** de `Sort`.
