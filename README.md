# Landing IA - Next.js 14

Landing page para capturar leads de una checklist (PDF) y mostrar oferta beta en la página de gracias.

## Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- ESLint (next/core-web-vitals)

## Requisitos previos

- Node.js 18+
- npm o pnpm

## Variables de entorno

Crea un archivo `.env.local` basado en `.env.example`:

```
NEXT_PUBLIC_SITE_URL=https://tudominio.com
NEXT_PUBLIC_WHATSAPP_LINK=https://wa.me/56XXXXXXXXX?text=Hola%20vengo%20de%20la%20landing
EMAIL_PROVIDER=none            # brevo | mailerlite | none
BREVO_API_KEY=replace_me
BREVO_LIST_ID=123
MAILERLITE_API_KEY=replace_me
MAILERLITE_GROUP_ID=123456789
GA_MEASUREMENT_ID=G-XXXXXXX
META_PIXEL_ID=1234567890
```

Notas:
- Si usas `EMAIL_PROVIDER=brevo` o `mailerlite`, debes completar las claves y IDs.
- No expongas claves privadas en repos públicos.

## Scripts

```
npm run dev        # desarrollo en http://localhost:3000
npm run build      # build de producción
npm run start      # servir build
npm run lint       # ejecutar eslint
npm run typecheck  # verificar tipos TypeScript
```

## Correr en local

1. `npm install`
2. Configura `.env.local`
3. `npm run dev`
4. Abre `http://localhost:3000`

QA local:
- Completa email válido → 200 → redirige a `/gracias` → en consola verás `lead_submitted` (si GA/FB están presentes) y se muestra Toast éxito.
- El botón WhatsApp abre `NEXT_PUBLIC_WHATSAPP_LINK`.

## Despliegue en Vercel

1. Importa el proyecto en Vercel.
2. Configura variables de entorno en Project Settings → Environment Variables (Production/Preview).
3. Establece `NEXT_PUBLIC_SITE_URL` al dominio (ej. `https://tudominio.com`).
4. Deploy.

### Dominio
Conecta tu dominio en Vercel (Domains) y apunta DNS según indicaciones. Actualiza `NEXT_PUBLIC_SITE_URL`.

### Cambiar copy
- Edita los componentes en `components/` (p. ej. `Hero.tsx`, `ValueProps.tsx`, `FAQ.tsx`).

## Integraciones de email

Seleccionadas por `EMAIL_PROVIDER`:

- `brevo`: se llama a la API v3 para upsert en lista y añadir atributos UTM y tag `lead-ia`.
- `mailerlite`: API v2 para crear/actualizar suscriptor y asignar al grupo, con campos UTM.
- `none`: modo desarrollo, guarda en memoria.

## Accesibilidad y rendimiento

- Labels asociados, foco visible con `focus:ring`, contraste AA.
- Mobile-first, breakpoints `md` y `lg`.
- Lighthouse móvil ≥ 90 en Performance/SEO/Best Practices/Accessibility (depende de hosting y contenido final).

## Notas de seguridad

- Las claves se usan sólo en el servidor (`/app/api/subscribe`).
- UTM sanitizados y CORS restringido a mismo origen.

