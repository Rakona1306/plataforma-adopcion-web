## Documentación de API - Email Verification con Resend

### Endpoints de Autenticación

#### 1. Registro (Enviar Código de Verificación)
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "email": "usuario@example.com",
  "password": "SecurePassword123!",
  "name": "Juan",
  "lastName": "Perez"
}
```

**Response (200 OK):**
```json
{
  "message": "Código de verificación enviado a tu email. Por favor verifica tu correo.",
  "email": "usuario@example.com"
}
```

**Errors:**
- 400 Bad Request: El email ya tiene cuenta registrada
- 500 Internal Server Error: Error al enviar el email

---

#### 2. Confirmar Código de Verificación
**POST** `/api/auth/verify-email`

**Request Body:**
```json
{
  "email": "usuario@example.com",
  "code": "123456"
}
```

**Response (200 OK):**
```json
{
  "message": "Email verificado exitosamente.",
  "email": "usuario@example.com"
}
```

**Errors:**
- 400 Bad Request: 
  - Código inválido
  - Código expirado
  - Email no encontrado
  - Demasiados intentos (máximo 5)

---

#### 3. Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "usuario@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "usuario@example.com",
    "name": "Juan",
    "lastName": "Perez",
    "toDashboard": true
  }
}
```

---

### Flujo de Registro Completo

1. **Cliente envía datos de registro**
   ```
   POST /api/auth/register
   Body: { email, password, name, lastName }
   ```

2. **Servidor valida datos**
   - Verifica que el email no esté registrado
   - Genera código de 6 dígitos
   - Crea registro en `EmailVerifications`

3. **Servidor envía email con Resend**
   - Template HTML profesional
   - Código visible en el email
   - Expiración de 15 minutos

4. **Cliente recibe confirmación**
   ```
   Response: 200 OK
   Body: { message, email }
   ```

5. **Cliente solicita verificación**
   ```
   POST /api/auth/verify-email
   Body: { email, code }
   ```

6. **Servidor valida código**
   - Verifica que no haya expirado
   - Valida intentos (máximo 5)
   - Marca como verificado

7. **Cliente recibe confirmación**
   ```
   Response: 200 OK
   Body: { message, email }
   ```

---

### Configuración de Resend

**Variables de Entorno (.env):**
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

**O en appsettings.json:**
```json
{
  "Resend": {
    "ApiKey": "re_xxxxxxxxxxxxxxxxxxxxx"
  }
}
```

---

### Template del Email

El email incluye:
- Encabezado profesional con branding
- Código en tamaño grande (32px) con fuente monoespaciada
- Advertencia de seguridad
- Información de expiración (15 minutos)
- Footer con derechos de autor

---

### Gestión de Códigos

- **Generación**: Random(100000, 999999) = 6 dígitos
- **Expiración**: 15 minutos desde la creación
- **Almacenamiento**: Tabla `EmailVerifications` en BD
- **Reintentos**: Máximo 5 intentos fallidos
- **Auditoría**: CreatedAt, LastUpdatedAt se registran

---

### Excepciones y Validaciones

1. **Email duplicado**: `BadRequestException` - "El email ya tiene cuenta"
2. **Código inválido**: `BadRequestException` - "Código de verificación inválido"
3. **Código expirado**: `BadRequestException` - "Email no encontrado o código expirado"
4. **Demasiados intentos**: `BadRequestException` - "Demasiados intentos..."
5. **Error Resend**: Se captura y registra en logs

---

### Ejemplos CURL

**Registro:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "SecurePassword123!",
    "name": "Juan",
    "lastName": "Perez"
  }'
```

**Verificar Email:**
```bash
curl -X POST http://localhost:5000/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "code": "123456"
  }'
```

---

### Notas Importantes

1. **NO GUARDES EL USUARIO HASTA VERIFICACIÓN**: Actualmente el flujo es:
   - Register: Genera código
   - VerifyEmail: Marca como verificado
   - Luego el cliente debe hacer login o crear el usuario en BD

2. **CONSIDERA AGREGAR USUARIO FINAL**: Actualiza el ConfirmEmailAsync para crear el usuario al confirmar el código

3. **SEGURIDAD**: El código se genera una sola vez, si falla la verificación, pedir que se registre nuevamente

4. **EXPIRACIÓN**: Los códigos expirados se pueden limpiar con `DeleteExpiredAsync()`
