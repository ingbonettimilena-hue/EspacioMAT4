# Configuración del Envío de Correos

Este documento explica cómo configurar el sistema de envío de correos electrónicos desde el formulario de contacto.

## Requisitos

- Cuenta en [Resend](https://resend.com)
- Dominio verificado en Resend (o usar el dominio de prueba)

## Pasos de Configuración

### 1. Crear una cuenta en Resend

1. Ve a [https://resend.com](https://resend.com)
2. Crea una cuenta gratuita
3. Verifica tu correo electrónico

### 2. Obtener la API Key

1. Inicia sesión en tu cuenta de Resend
2. Ve a la sección "API Keys" en el dashboard
3. Haz clic en "Create API Key"
4. Dale un nombre descriptivo (ej: "Espacio MAT - Producción")
5. Copia la API key generada (solo se mostrará una vez)

### 3. Configurar Variables de Entorno

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Reemplaza `tu_api_key_aqui` con tu API key de Resend:

```env
RESEND_API_KEY=re_tu_api_key_real_aqui
```

3. Guarda el archivo

### 4. Configurar el Dominio de Envío

#### Opción A: Usar dominio de prueba (para desarrollo)

Por defecto, la API usa `onboarding@resend.dev` que es un dominio de prueba de Resend. Este dominio solo puede enviar correos a la dirección de email verificada en tu cuenta de Resend.

#### Opción B: Usar tu propio dominio (para producción)

1. En el dashboard de Resend, ve a "Domains"
2. Haz clic en "Add Domain"
3. Ingresa tu dominio (ej: `espaciomat.com`)
4. Sigue las instrucciones para agregar los registros DNS necesarios
5. Espera a que el dominio sea verificado (puede tomar hasta 48 horas)
6. Una vez verificado, actualiza el archivo `app/api/contact/route.ts`:

```typescript
from: 'Espacio MAT <contacto@espaciomat.com>', // Reemplaza con tu dominio verificado
```

### 5. Configurar el Email de Destino

El correo se envía a `contacto@espacioMAT.com` por defecto. Si necesitas cambiarlo:

1. Abre `app/api/contact/route.ts`
2. Busca la línea:
```typescript
to: ['contacto@espacioMAT.com'],
```
3. Reemplaza con el email deseado

### 6. Probar el Formulario

1. Inicia el servidor de desarrollo:
```bash
npm run dev
```

2. Ve a la sección de contacto en tu sitio web
3. Completa el formulario con datos de prueba
4. Haz clic en "Enviar mensaje"
5. Deberías ver una notificación de éxito
6. Verifica que el correo llegó a la bandeja de entrada

## Solución de Problemas

### Error: "RESEND_API_KEY is not defined"

- Asegúrate de que el archivo `.env.local` existe en la raíz del proyecto
- Verifica que la variable `RESEND_API_KEY` está correctamente definida
- Reinicia el servidor de desarrollo después de agregar la variable

### Los correos no llegan

- Verifica que tu API key es válida
- Si usas el dominio de prueba, asegúrate de que el email de destino está verificado en Resend
- Revisa la consola del navegador y los logs del servidor para ver errores
- Verifica en el dashboard de Resend si los correos fueron enviados

### Error 400: "Email inválido"

- Verifica que el formato del email es correcto
- Asegúrate de que todos los campos del formulario están completos

## Límites del Plan Gratuito de Resend

- 100 correos por día
- 3,000 correos por mes
- Solo puedes enviar desde dominios verificados (o usar el dominio de prueba)

Para más información, consulta la [documentación de Resend](https://resend.com/docs).

## Seguridad

- **NUNCA** subas el archivo `.env.local` a Git
- El archivo `.gitignore` ya está configurado para excluir archivos `.env*`
- Usa variables de entorno diferentes para desarrollo y producción
- En producción (Vercel, Netlify, etc.), configura las variables de entorno en el panel de control de tu plataforma

## Personalización del Email

Para personalizar el diseño del correo electrónico, edita la sección HTML en `app/api/contact/route.ts`:

```typescript
html: `
  <!DOCTYPE html>
  <html>
    <!-- Tu HTML personalizado aquí -->
  </html>
`,
```

## Soporte

Si tienes problemas con la configuración:

1. Revisa la [documentación de Resend](https://resend.com/docs)
2. Verifica los logs del servidor
3. Contacta al soporte de Resend si el problema persiste