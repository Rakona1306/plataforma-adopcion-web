¡Tienes toda la razón! Vamos a actualizar y enriquecer la documentación para incluir los **cuerpos de petición (`body`)**, los **ejemplos de respuesta (`response`)** y el encabezado de seguridad **`Authorization: Bearer <token>`** que se requiere al utilizar `[AuthorizeJwt]`.

---

# Documentación de API: Módulo de Mascotas (Pets - Privado)

* **Ruta base:** `api/pets`
* **Autenticación:** Obligatoria en los endpoints de escritura. Debes enviar el token JWT en las cabeceras de la petición:


```http
Authorization: Bearer <tu_token_jwt>

```



---

## Endpoints Disponibles

### 1. Obtener todas las mascotas (Paginado y Filtrado)

* **Método:** `GET`
* **Ruta:** `api/pets`
* **Autenticación:** Pública (Caché de 60 segundos)


* **Parámetros de consulta (`Query Parameters`):** `PetFilterDto`

* `Page`, `PageSize`, `Search`, `Sort`, `Gender`, `SpecieId`, `Size`, `BreedId`, `MinAge`, `MaxAge`, `IsVaccinated`, `IsSterilized`, `IsAdopted`.




* **Ejemplo de Respuesta (`200 OK` - `List<PetResponse>`):**

```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "Firulais",
    "description": "Un perrito muy amigable",
    "rescueStory": "Rescatado de la calle",
    "birthDate": "2023-01-01",
    "weightKg": 12.5,
    "age": 3,
    "slug": "firulais",
    "isVaccinated": true,
    "isRecommend": false,
    "isSterilized": true,
    "isAdopted": false,
    "isBirthday": false,
    "gender": { "id": 1, "name": "Macho" },
    "size": { "id": 2, "name": "Mediano" },
    "status": { "id": 1, "name": "Disponible" },
    "speciesId": "3fa85f64-5717-4562-b3fc-2c963f66afa1",
    "speciesName": "Canino",
    "breeds": [],
    "traits": [],
    "photoUrls": [],
    "vaccines": [],
    "createdAt": "2026-09-24T10:00:00Z"
  }
]

```



---

### 2. Obtener mascotas más solicitadas

* **Método:** `GET`
* **Ruta:** `api/pets/most-requested`
* **Parámetros de consulta (`Query Parameters`):** `PetFilterDto`

* **Ejemplo de Respuesta (`200 OK`):** Retorna una lista estructurada similar a `PetResponse` orientada al orden de solicitudes.



---

### 3. Obtener mascota por ID

* **Método:** `GET`
* **Ruta:** `api/pets/{id}`
* **Autenticación:** Pública (Caché de 60 segundos)


* **Parámetros de ruta:** `id` (Guid)
* **Ejemplo de Respuesta (`200 OK` - `PetResponse`):**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Firulais",
  "description": "Un perrito muy amigable",
  "rescueStory": "Rescatado de la calle",
  "birthDate": "2023-01-01",
  "weightKg": 12.5,
  "age": 3,
  "slug": "firulais",
  "isVaccinated": true,
  "isRecommend": false,
  "isSterilized": true,
  "isAdopted": false,
  "isBirthday": false,
  "gender": { "id": 1, "name": "Macho" },
  "size": { "id": 2, "name": "Mediano" },
  "status": { "id": 1, "name": "Disponible" },
  "speciesId": "3fa85f64-5717-4562-b3fc-2c963f66afa1",
  "speciesName": "Canino",
  "breeds": [],
  "traits": [],
  "photoUrls": [],
  "vaccines": [],
  "createdAt": "2026-09-24T10:00:00Z"
}

```



---

### 4. Crear una nueva mascota

* **Método:** `POST`
* **Ruta:** `api/pets`
* **Seguridad:** Requiere cabecera `Authorization: Bearer <token>`

* **Cuerpo de la petición (`Body - CreatePetDto`):**

```json
{
  "name": "Luna",
  "description": "Cachorra juguetona",
  "rescueStory": "Encontrada en un parque",
  "birthDate": "2025-05-10",
  "weightKg": 8.0,
  "isVaccinated": true,
  "isSterilized": false,
  "isRecommend": true,
  "isAdopted": false,
  "age": 1,
  "gender": 2,
  "size": 1,
  "status": 1,
  "speciesId": "3fa85f64-5717-4562-b3fc-2c963f66afa1",
  "breedIds": {
    "addIds": ["3fa85f64-5717-4562-b3fc-2c963f66afa2"],
    "removeIds": []
  },
  "traitIds": {
    "addIds": ["3fa85f64-5717-4562-b3fc-2c963f66afa3"],
    "removeIds": []
  }
}

```


* **Ejemplo de Respuesta (`200 OK`):** Retorna el objeto `PetResponse` recién creado con su ID generado.

---

### 5. Actualizar una mascota existente

* **Método:** `PUT`
* **Ruta:** `api/pets/{id}`
* **Seguridad:** Requiere cabecera `Authorization: Bearer <token>`

* **Parámetros de ruta:** `id` (Guid) de la mascota.
* **Cuerpo de la petición (`Body - UpdatePetDto`):**

```json
{
  "name": "Luna Actualizada",
  "description": "Cachorra muy juguetona",
  "rescueStory": "Encontrada en un parque",
  "birthDate": "2025-05-10",
  "age": 1,
  "weightKg": 8.5,
  "isVaccinated": true,
  "isSterilized": true,
  "isRecommend": false,
  "gender": 2,
  "size": 1,
  "status": 1,
  "speciesId": "3fa85f64-5717-4562-b3fc-2c963f66afa1",
  "breedIds": {
    "addIds": [],
    "removeIds": ["3fa85f64-5717-4562-b3fc-2c963f66afa2"]
  },
  "traitIds": {
    "addIds": [],
    "removeIds": []
  }
}

```


* **Ejemplo de Respuesta (`200 OK`):** Retorna el `PetResponse` actualizado.

---

### 6. Eliminar una mascota

* **Método:** `DELETE`
* **Ruta:** `api/pets/{id}`
* **Seguridad:** Requiere cabecera `Authorization: Bearer <token>`

* **Parámetros de ruta:** `id` (Guid)
* **Ejemplo de Respuesta (`204 No Content`):** Sin cuerpo de respuesta (éxito).