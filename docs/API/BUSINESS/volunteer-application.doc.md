
# 📄 Documentación de API: Solicitudes de Voluntariado (`Volunteer Applications`)

Esta documentación describe las rutas disponibles para la gestión de oportunidades y solicitudes de voluntariado, divididas en dos módulos: **Público** (accesible sin autenticación para usuarios finales) y **Privado** (requiere autenticación JWT para administración y gestión completa).

---

## 🌐 1. Módulo Público (`/api/v1/volunteer-applications`)

Endpoints diseñados para los usuarios que desean consultar las oportunidades de voluntariado disponibles.

### 1.1. Obtener listado paginado de voluntariado

* **URL:** `/api/v1/volunteer-applications`
* **Método:** `GET`
* **Autenticación:** No requerida (Público)

#### Parámetros de Consulta (`Query Parameters`)

| Parámetro | Tipo | Requerido | Descripción |
| --- | --- | --- | --- |
| `Page` | `int` | No | Número de página (Por defecto: `1`) |
| `PageSize` | `int` | No | Cantidad de elementos por página (Por defecto: `10`) |
| `Search` | `string` | No | Texto de búsqueda para filtrar por título o descripción |
| `Urgency` | `int / string` | No | Nivel de urgencia (`0: NORMAL`, etc.) |
| `IsCertified` | `bool` | No | Filtrar si otorga certificado (`true` / `false`) |
| `StartDateFrom` | `DateTime` | No | Fecha de inicio desde (Formato ISO: `YYYY-MM-DDTHH:mm:ss`) |
| `StartDateTo` | `DateTime` | No | Fecha de inicio hasta (Formato ISO: `YYYY-MM-DDTHH:mm:ss`) |

*Ejemplo de solicitud:*

```http
GET /api/v1/volunteer-applications?Page=1&PageSize=5&Search=limpieza&IsCertified=true

```

#### Respuesta Exitosa (`200 OK`)

Devuelve un objeto paginado (`Paginate`) con una lista de respuestas públicas (`VolunteerApplicationPublicResponse`).

```json
{
  "items": [
    {
      "id": 1,
      "title": "Jornada de reforestación urbana",
      "subTitle": "Ayúdanos a plantar árboles en el parque central",
      "description": "Actividad comunitaria para mejorar las áreas verdes.",
      "requirements": "Llevar ropa cómoda y agua.",
      "minAge": 18,
      "maxAge": 50,
      "address": "Parque Central, Av. Principal",
      "googleMapLinkAddress": "https://maps.google.com/?q=parque+central",
      "startDate": "2026-07-15T09:00:00",
      "endDate": "2026-07-15T14:00:00",
      "contactEmail": "voluntarios@ong.org",
      "contactPhone": "+51999888777",
      "isCertified": true,
      "urgency": 1
    }
  ],
  "page": 1,
  "pageSize": 5,
  "totalItems": 1,
  "totalPages": 1
}

```

---

### 1.2. Obtener detalle de un voluntariado específico

* **URL:** `/api/v1/volunteer-applications/{id}`
* **Método:** `GET`
* **Autenticación:** No requerida (Público)

#### Parámetros de Ruta

| Parámetro | Tipo | Requerido | Descripción |
| --- | --- | --- | --- |
| `id` | `int` | **Sí** | Identificador único de la oportunidad de voluntariado |

*Ejemplo de solicitud:*

```http
GET /api/v1/volunteer-applications/1

```

#### Respuesta Exitosa (`200 OK`)

```json
{
  "id": 1,
  "title": "Jornada de reforestación urbana",
  "subTitle": "Ayúdanos a plantar árboles en el parque central",
  "description": "Actividad comunitaria para mejorar las áreas verdes.",
  "requirements": "Llevar ropa cómoda y agua.",
  "minAge": 18,
  "maxAge": 50,
  "address": "Parque Central, Av. Principal",
  "googleMapLinkAddress": "https://maps.google.com/?q=parque+central",
  "startDate": "2026-07-15T09:00:00",
  "endDate": "2026-07-15T14:00:00",
  "contactEmail": "voluntarios@ong.org",
  "contactPhone": "+51999888777",
  "isCertified": true,
  "urgency": 1
}

```

#### Respuestas de Error

* **`404 Not Found`**: Cuando el ID no existe.

```json
{
  "message": "La oportunidad de voluntariado no fue encontrada."
}

```

---

## 🔒 2. Módulo Privado / Administrativo (`/api/volunteer-applications`)

Endpoints dirigidos a administradores o gestores. **Requiere enviar un Token JWT válido** en los Headers de la petición (`Authorization: Bearer <tu_token>`).

---

### 2.1. Obtener listado completo (Administración)

* **URL:** `/api/volunteer-applications`
* **Método:** `GET`
* **Autenticación:** Requerida (`[AuthorizeJwt]`)

#### Parámetros de Consulta (`Query Parameters`)

Comparte los mismos filtros que el endpoint público (`Page`, `PageSize`, `Search`, `Urgency`, `IsCertified`, `StartDateFrom`, `StartDateTo`).

*Ejemplo de solicitud:*

```http
GET /api/volunteer-applications?Page=1&PageSize=10
Authorization: Bearer eyJhbGciOiJIUzI1Ni...

```

#### Respuesta Exitosa (`200 OK`)

Retorna los datos completos incluyendo metadatos de auditoría (`CreatedAt`, `UpdatedAt`).

```json
{
  "items": [
    {
      "id": 1,
      "title": "Jornada de reforestación urbana",
      "subTitle": "Ayúdanos a plantar árboles",
      "description": "Actividad comunitaria...",
      "requirements": "Llevar ropa cómoda.",
      "minAge": 18,
      "maxAge": 50,
      "address": "Parque Central",
      "googleMapLinkAddress": "https://maps.google.com/...",
      "startDate": "2026-07-15T09:00:00",
      "endDate": "2026-07-15T14:00:00",
      "contactEmail": "voluntarios@ong.org",
      "contactPhone": "+51999888777",
      "isCertified": true,
      "urgency": 1,
      "createdAt": "2026-06-01T10:00:00Z",
      "updatedAt": null
    }
  ],
  "page": 1,
  "pageSize": 10,
  "totalItems": 1,
  "totalPages": 1
}

```

---

### 2.2. Obtener solicitud por ID (Administración)

* **URL:** `/api/volunteer-applications/{id}`
* **Método:** `GET`
* **Autenticación:** Requerida (`[AuthorizeJwt]`)

*Ejemplo de solicitud:*

```http
GET /api/volunteer-applications/1
Authorization: Bearer eyJhbGciOiJIUzI1Ni...

```

#### Respuesta Exitosa (`200 OK`)

Devuelve la estructura completa con auditoría (igual al ítem del listado privado).

#### Respuestas de Error

* **`404 Not Found`**:

```json
{
  "message": "La solicitud con ID 1 no fue encontrada."
}

```

---

### 2.3. Crear una nueva solicitud de voluntariado

* **URL:** `/api/volunteer-applications`
* **Método:** `POST`
* **Autenticación:** Requerida (`[AuthorizeJwt]`)

#### Cuerpo de la Petición (`Body` - JSON)

| Campo | Tipo | Requerido | Restricciones / Validación |
| --- | --- | --- | --- |
| `title` | `string` | **Sí** | Máximo 200 caracteres |
| `subTitle` | `string` | No | Máximo 500 caracteres |
| `description` | `string` | **Sí** | Texto requerido |
| `requirements` | `string` | No | Máximo 1000 caracteres |
| `minAge` | `int` | No | Rango entre `0` y `100` |
| `maxAge` | `int` | No | Rango entre `0` y `100` |
| `address` | `string` | No | Máximo 200 caracteres |
| `googleMapLinkAddress` | `string` | No | Enlace de ubicación |
| `startDate` | `DateTime` | No | Formato ISO 8601 |
| `endDate` | `DateTime` | No | Formato ISO 8601 |
| `contactEmail` | `string` | No | Formato de email válido, máx. 100 caracteres |
| `contactPhone` | `string` | No | Formato de teléfono válido, máx. 20 caracteres |
| `isCertified` | `bool` | No | Por defecto: `false` |
| `urgency` | `int` | No | Nivel de urgencia (`0: NORMAL`, etc.) |

*Ejemplo de Body (`POST`):*

```json
{
  "title": "Taller de Reforzamiento Escolar",
  "subTitle": "Apoyo en matemáticas para niños de primaria",
  "description": "Buscamos voluntarios apasionados por la enseñanza para dictar tutorías sabatinas.",
  "requirements": "Ser mayor de edad, paciencia y buen nivel de matemáticas básicas.",
  "minAge": 18,
  "maxAge": 60,
  "address": "Centro Comunitario Los Olivos",
  "googleMapLinkAddress": "https://maps.google.com/?q=centro+comunitario",
  "startDate": "2026-08-01T08:00:00",
  "endDate": "2026-11-30T12:00:00",
  "contactEmail": "educacion@ong.org",
  "contactPhone": "+51911222333",
  "isCertified": true,
  "urgency": 2
}

```

#### Respuestas

* **`201 Created`**: Devuelve el objeto recién creado con su ID generado y metadatos de auditoría.
* **`400 Bad Request`**: Si falla la validación por FluentValidation (retorna un array con los errores de los campos).

---

### 2.4. Actualizar una solicitud de voluntariado existente

* **URL:** `/api/volunteer-applications/{id}`
* **Método:** `PUT`
* **Autenticación:** Requerida (`[AuthorizeJwt]`)

#### Parámetros de Ruta

| Parámetro | Tipo | Requerido | Descripción |
| --- | --- | --- | --- |
| `id` | `int` | **Sí** | ID de la solicitud a actualizar |

#### Cuerpo de la Petición (`Body` - JSON)

Utiliza la misma estructura de campos que el `POST` de creación (`title`, `description`, `minAge`, `urgency`, etc.).

*Ejemplo de Body (`PUT`):*

```json
{
  "title": "Taller de Reforzamiento Escolar (Actualizado)",
  "subTitle": "Apoyo en matemáticas y comunicación",
  "description": "Buscamos voluntarios para tutorías sabatinas ampliadas.",
  "requirements": "Ser mayor de edad.",
  "minAge": 18,
  "maxAge": 65,
  "address": "Centro Comunitario Los Olivos",
  "googleMapLinkAddress": "https://maps.google.com/?q=centro+comunitario",
  "startDate": "2026-08-01T08:00:00",
  "endDate": "2026-12-15T12:00:00",
  "contactEmail": "educacion@ong.org",
  "contactPhone": "+51911222333",
  "isCertified": true,
  "urgency": 1
}

```

#### Respuestas

* **`200 OK`**: Retorna la entidad actualizada.
* **`400 Bad Request`**: Errores de validación en los campos enviados.
* **`404 Not Found`**: Si el ID no existe.

```json
{
  "message": "La solicitud con ID 1 no fue encontrada para actualizar."
}

```

---

### 2.5. Eliminar una solicitud de voluntariado

* **URL:** `/api/volunteer-applications/{id}`
* **Método:** `DELETE`
* **Autenticación:** Requerida (`[AuthorizeJwt]`)

#### Parámetros de Ruta

| Parámetro | Tipo | Requerido | Descripción |
| --- | --- | --- | --- |
| `id` | `int` | **Sí** | ID de la solicitud a eliminar |

*Ejemplo de solicitud:*

```http
DELETE /api/volunteer-applications/1
Authorization: Bearer eyJhbGciOiJIUzI1Ni...

```

#### Respuestas

* **`204 No Content`**: Eliminación exitosa (sin contenido en la respuesta).
* **`404 Not Found`**: Si el registro no existe o ya fue eliminado.

```json
{
  "message": "La solicitud con ID 1 no fue encontrada o ya fue eliminada."
}

```