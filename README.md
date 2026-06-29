# EspacioMAT4

Sitio web de **Espacio MAT** — plataforma educativa de matemáticas construida con [Next.js](https://nextjs.org) y diseñada en [v0](https://v0.app).

---

## Tecnologías utilizadas

- [Next.js 16](https://nextjs.org) — framework React con App Router
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com) — componentes accesibles
- [Framer Motion](https://www.framer.motion.com) — animaciones
- [Resend](https://resend.com) — envío de correos desde el formulario de contacto
- [Recharts](https://recharts.org) — gráficos
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) — formularios y validación

---

## Requisitos previos

Antes de instalar el proyecto, asegúrate de tener:

- **Node.js** v18 o superior → [descargar](https://nodejs.org)
- **pnpm** (recomendado), npm o yarn

Para instalar pnpm:
```bash
npm install -g pnpm
```

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/EspacioMAT4.git
cd EspacioMAT4
```

### 2. Instalar dependencias

```bash
pnpm install
# o con npm:
npm install
```

### 3. Configurar las variables de entorno

Copia el archivo de ejemplo y rellena los valores:

```bash
cp .env.example .env.local
```

Luego edita `.env.local` con tus credenciales:

```env
# API Key de Resend (para el formulario de contacto)
# Obtén la tuya en: https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Google Analytics (opcional)
# Formato: G-XXXXXXXXXX
NEXT_PUBLIC_GA_ID=

# Google Maps (opcional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# NextAuth
# Genera un secret con: openssl rand -base64 32
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

> ⚠️ **Importante:** El archivo `.env.local` está excluido del control de versiones por el `.gitignore`. Nunca lo subas a GitHub.

---

## Ejecución en desarrollo

```bash
pnpm dev
# o con npm:
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Compilar para producción

```bash
# Construir la aplicación
pnpm build

# Iniciar el servidor de producción
pnpm start
```

---

## Estructura del proyecto

```
EspacioMAT4/
├── app/
│   ├── api/
│   │   └── contact/       # Endpoint del formulario de contacto (Resend)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx           # Página principal
├── components/
│   └── espacio-mat/       # Componentes de la landing page
├── hooks/                 # Custom hooks
├── lib/                   # Utilidades
├── public/                # Archivos estáticos
├── styles/
├── .env.example           # Plantilla de variables de entorno
└── next.config.mjs
```

---

## Secciones de la landing page

| Sección | Descripción |
|---|---|
| **Header** | Navegación principal |
| **Hero** | Presentación principal |
| **Filosofía** | Valores y enfoque pedagógico |
| **Quiénes Somos** | Información del equipo |
| **Proceso** | Metodología de trabajo |
| **Servicios** | Oferta educativa |
| **Clases Semanales** | Horarios y modalidades |
| **Cursos y Talleres** | Programas disponibles |
| **Contacto** | Formulario con envío por email |
| **Footer** | Información de contacto y redes |

---

## Configuración del formulario de contacto

El formulario usa **Resend** para enviar correos. Consulta la guía detallada en [`CONFIGURACION_EMAIL.md`](./CONFIGURACION_EMAIL.md).

Pasos rápidos:
1. Crea una cuenta gratuita en [resend.com](https://resend.com)
2. Obtén tu API Key en el dashboard
3. Pégala en `.env.local` como `RESEND_API_KEY=re_...`
4. Reinicia el servidor de desarrollo

---

## Despliegue en Vercel

La forma más sencilla de desplegar este proyecto es usando [Vercel](https://vercel.com):

1. Haz fork o sube el repositorio a GitHub
2. Importa el repositorio en [vercel.com/new](https://vercel.com/new)
3. Configura las variables de entorno en el panel de Vercel (mismas que en `.env.local`)
4. Haz clic en **Deploy**

Este proyecto también está vinculado a un proyecto de v0:
[Continuar trabajando en v0 →](https://v0.app/chat/projects/prj_PaSpg5b3v3bkZRJlrMRZlthyhKEc)

---

## Licencia

Proyecto privado — © Espacio MAT. Todos los derechos reservados.
