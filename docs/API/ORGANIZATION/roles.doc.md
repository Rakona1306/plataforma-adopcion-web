# 📄 Documentación de API: Gestión de Roles (`Roles`)

Esta documentación describe las rutas disponibles para la gestión de roles dentro de la organización. Este módulo es **totalmente privado** y está diseñado para administradores o gestores del sistema. Requiere autenticación JWT para cualquier interacción.

## 🔒 Módulo Privado / Administrativo (`/api/roles`)

Todos los endpoints descritos a continuación requieren enviar un Token JWT válido en los Headers de la petición.

### Cabeceras Obligatorias (Headers)
Para todas las peticiones debes incluir:
*   `Authorization`: `Bearer <tu_token_jwt>`
*   `Content-Type`: `application/json` (para POST y PUT)

---

### 1. Crear un nuevo Rol
Crea un rol en el sistema y le asigna permisos iniciales. El sistema validará que no exista otro rol con el mismo nombre (sin importar mayúsculas o minúsculas).

*   **URL:** `/api/roles`
*   **Método:** `POST`
*   **Autenticación:** Requerida (`[AuthorizeJwt]`)

#### Cuerpo de la Petición (`Body` - JSON)

| Campo | Tipo | Requerido | Descripción / Validación |
| :--- | :--- | :--- | :--- |
| `name` | string | **Sí** | Nombre único del rol. No puede estar vacío. |
| `description` | string | No | Descripción breve del propósito del rol. |
| `notDelete` | bool | No | Si es `true`, el rol queda protegido y no se podrá borrar. *(Default: `false`)* |
| `toDashboard` | bool | No | Indica si el rol debe mostrarse en el panel principal. *(Default: `true`)* |
| `currentPermissions` | List<Guid> | No | Lista de IDs (GUIDs) de los permisos que tendrá el rol al crearse. |

#### Ejemplo de Body (`POST`):
```json
{
  "name": "Gerente de Ventas",
  "description": "Rol encargado de supervisar el equipo comercial regional",
  "notDelete": false,
  "toDashboard": true,
  "currentPermissions": [
    "123e4567-e89b-12d3-a456-426614174000",
    "987fcdeb-51a2-43d7-9012-3456789abcde"
  ]
}
```

#### Respuestas
*   **`200 OK`**: Devuelve el objeto del rol recién creado con sus detalles y permisos asignados.
*   **`500 Internal Server Error`**: Si ya existe un rol con ese nombre ("Este rol ya existe").

---

### 2. Obtener listado paginado de Roles
Obtiene una lista de roles con opciones de filtrado, búsqueda y ordenamiento. Incluye caché de 60 segundos para mejorar el rendimiento.

*   **URL:** `/api/roles`
*   **Método:** `GET`
*   **Autenticación:** Requerida (`[AuthorizeJwt]`)

#### Parámetros de Consulta (`Query Parameters`)

| Parámetro | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `Page` | int | No | Número de página. *(Default: 1)* |
| `PageSize` | int | No | Cantidad de elementos por página. *(Default: 10)* |
| `Search` | string | No | Texto para buscar coincidencias en el nombre del rol. |
| `ToDashboard` | bool | No | Filtra solo roles visibles en el dashboard (`true` o `false`). |
| `PermissionId` | string | No | Filtra roles que contengan estos permisos. Si son varios, sepáralos con un pipe `\|`. Ej: `guid1\|guid2`. |
| `Sort` | string | No | Criterio de ordenamiento. Opciones: `name_asc`, `name_desc`, `createdAt_desc`. *(Default: `createdAt_desc`)* |

#### Ejemplo de solicitud:
```http
GET /api/roles?Page=1&PageSize=5&Search=Admin&Sort=name_asc
Authorization: Bearer eyJhbGciOiJIUzI1Ni...
```

#### Respuesta Exitosa (`200 OK`)
Devuelve un objeto paginado (`Paginate`) con una lista de respuestas (`RoleResponse`).

```json
{
  "items": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "name": "Administrador",
      "description": "Acceso total al sistema",
      "toDashboard": true,
      "createdAt": "2026-09-16T10:00:00Z",
      "usersCount": 3,
      "permissions": [
        {
          "id": "123e4567...",
          "name": "Gestionar Usuarios"
        }
      ]
    }
  ],
  "totalCount": 15,
  "page": 1,
  "pageSize": 5,
  "totalPages": 3
}
```

---

### 3. Obtener detalle de un Rol específico
Trae la información completa de un rol basado en su identificador único (GUID).

*   **URL:** `/api/roles/{id}`
*   **Método:** `GET`
*   **Autenticación:** Requerida (`[AuthorizeJwt]`)

#### Parámetros de Ruta
| Parámetro | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | Guid | **Sí** | Identificador único del rol. |

#### Ejemplo de solicitud:
```http
GET /api/roles/a1b2c3d4-e5f6-7890-abcd-ef1234567890
Authorization: Bearer eyJhbGciOiJIUzI1Ni...
```

#### Respuestas
*   **`200 OK`**: Devuelve la estructura `RoleResponse` completa.
*   **`404 Not Found`**: Mensaje "Rol no encontrado".

---

### 4. Actualizar un Rol existente
Modifica los datos básicos del rol y gestiona sus permisos mediante listas de adición y eliminación.

*   **URL:** `/api/roles/{id}`
*   **Método:** `PUT`
*   **Autenticación:** Requerida (`[AuthorizeJwt]`)

#### Cuerpo de la Petición (`Body` - JSON)

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `name` | string | **Sí** | Nuevo nombre del rol. Debe seguir siendo único. |
| `description` | string | No | Nueva descripción. |
| `notDelete` | bool | No | Actualiza la protección contra borrado. |
| `toDashboard` | bool | No | Actualiza la visibilidad en el dashboard. |
| `permissionsToAdd` | List<Guid> | No | Lista de IDs de permisos que deseas **agregar** al rol. |
| `permissionsToRemove` | List<Guid> | No | Lista de IDs de permisos que deseas **quitar** del rol. |

#### Ejemplo de Body (`PUT`):
```json
{
  "name": "Gerente Senior",
  "description": "Rol actualizado con más responsabilidades",
  "notDelete": true,
  "toDashboard": true,
  "permissionsToAdd": [
    "nuevo-permiso-guid-1234"
  ],
  "permissionsToRemove": [
    "permiso-viejo-guid-5678"
  ]
}
```

#### Respuestas
*   **`200 OK`**: Retorna la entidad actualizada con los nuevos permisos aplicados.
*   **`404 Not Found`**: Si el ID no existe.
*   **`500 Internal Server Error`**: Si intentas cambiar el nombre a uno que ya usa otro rol.

---

### 5. Eliminar un Rol
Borra un rol del sistema. 

*   **URL:** `/api/roles/{id}`
*   **Método:** `DELETE`
*   **Autenticación:** Requerida (`[AuthorizeJwt]`)

#### Regla de Negocio Importante
Si el rol tiene la propiedad `notDelete` establecida en `true`, el sistema rechazará la eliminación para proteger roles críticos.

#### Respuestas
*   **`204 No Content`**: Eliminación exitosa (sin contenido en la respuesta).
*   **`404 Not Found`**: Si el registro no existe.
*   **`500 Internal Server Error`**: Mensaje "Este rol no puede ser eliminado" si está protegido.

---

### 6. Historial de Interacciones (Auditoría)
Consulta los registros de auditoría (logs) de un rol específico para saber quién lo modificó y cuándo.

*   **URL:** `/api/roles/{id}/interactions`
*   **Método:** `GET`
*   **Autenticación:** Requerida (`[AuthorizeJwt]`)
*   **Nota:** Incluye caché de 60 segundos.

#### Parámetros de Consulta
| Parámetro | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `page` | int | No | Página actual. *(Default: 1)* |
| `pageSize` | int | No | Elementos por página. *(Default: 10)* |

#### Estado Actual
🚧 **En construcción**. Actualmente, este endpoint lanza una excepción `NotImplementedException` en el servicio backend. Se recomienda no utilizarlo hasta que se complete su implementación.

---

### 💡 Notas Técnicas para Desarrolladores

1.  **Caché (OutputCache):** Los endpoints de lectura (`GET`) tienen una duración de caché de 60 segundos. Si realizas cambios (POST/PUT/DELETE) y consultas inmediatamente después, es posible que veas los datos antiguos hasta que expire el caché.
2.  **GUIDs:** Todos los identificadores de roles y permisos utilizan el formato GUID (ej. `123e4567-e89b-12d3-a456-426614174000`) para garantizar unicidad global.
3.  **Filtrado por Permisos:** Al usar el parámetro `PermissionId` en el listado, recuerda que puedes pasar múltiples IDs separados por el carácter pipe `|` (ej. `id1|id2|id3`) para encontrar roles que tengan cualquiera de esos permisos.