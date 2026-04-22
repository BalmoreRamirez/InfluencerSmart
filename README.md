# InfluencerSmart - MVP

Plataforma que conecta influencers con empresas para colaboraciones efectivas y transparentes.

## Stack Tecnológico

- Next.js 16.2.2 (App Router)
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- Firebase Web SDK
- Sistema de datos simulados (mock data)

## Funcionalidades del MVP

### Para Influencers

✅ **Registro y perfil público**
- Perfil completo con bio, categorías, países y precios
- Portfolio manual de trabajos previos
- Sistema de reviews recibidos

✅ **Conexión con Instagram (simulada)**
- Métricas de alcance, engagement y demografía
- Visualización de estadísticas de audiencia

✅ **Dashboard de colaboraciones**
- Vista de conversaciones activas con empresas
- Métricas de rendimiento del perfil
- Accesos rápidos a perfil y mensajes

✅ **Sistema de mensajes**
- Chat interno para negociar con empresas
- Envío y recepción de mensajes en tiempo real (simulado)
- Historial de conversaciones

### Para Empresas

✅ **Registro y perfil empresarial**
- Información de la empresa y objetivos
- Presupuesto mensual y créditos disponibles
- Categorías preferidas

✅ **Búsqueda avanzada de influencers**
- Filtros funcionales por:
  - País
  - Categoría
  - Rango de seguidores
  - Rango de precio
- 20+ influencers de ejemplo en diversos nichos

✅ **Perfiles detallados de influencers**
- Ver métricas de Instagram conectadas
- Leer reviews de otras empresas
- Portfolio de trabajos previos

✅ **Sistema de créditos**
- Cada mensaje nuevo consume 1 crédito
- Visualización de créditos disponibles en dashboard

✅ **Chat interno**
- Comunicación directa con influencers
- Envío de briefs y negociación

✅ **Sistema de reviews**
- Dejar reviews después de colaboraciones
- Sistema de calificación con estrellas (1-5)

## Datos de Prueba

### Credenciales de Acceso

No hay cuentas precargadas.

- Crea usuarios desde `Registro` (`/registro`) usando Firebase Authentication.
- El sistema inicia sin datos de prueba y genera perfiles desde cero.

### Datos Simulados

- Datos semilla deshabilitados para iniciar operación desde cero.

## Instalación y Uso

### Requisitos
- Node.js 20+
- npm o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts disponibles

```bash
npm run dev     # Servidor de desarrollo (http://localhost:3000)
npm run build   # Build de producción
npm run start   # Servidor de producción
npm run lint    # Ejecutar ESLint
npm run chat:server # Socket server fake para pruebas de chat
```

## Firebase

La app ya incluye inicializacion base de Firebase en `src/shared/lib/firebase.ts`.

Variables requeridas en `.env`:

```dotenv
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### Backend proxy para chat (Netlify/Next API)

Para evitar bloqueos de extensiones al hablar directo con Firestore desde el navegador, el envío de mensajes usa `/api/chat/send` con Firebase Admin SDK.

Variables adicionales requeridas en entorno (Netlify):

```dotenv
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Uso basico:

```ts
import { app } from "@/shared/lib/firebase";

if (!app) {
  throw new Error("Firebase no esta configurado");
}
```

## Modelo de Colecciones (Analisis)

### 1) `users` (ancla de identidad)

- ID del documento = `uid` de Firebase Auth.
- Campos: `username`, `email`, `role` (`influencer` o `company`), `profile_image`, `onboarding_complete`, `created_at`.
- Recomendacion: crear indice/constraint logico para `username` unico (validado en app + regla/Cloud Function).

### 2) `influencers` (busqueda publica)

- ID del documento = mismo `uid` del usuario influencer.
- Campos: `full_name`, `birth_date`, `dui`, `location`, `category`, `is_premium`, `metrics`, `prices`.
- Subcoleccion: `portfolio/{projectId}` con `image_url`, `link`, `description`.
- Ventaja: consultas de descubrimiento mas baratas para empresas sin leer datos privados de `users`.

### 3) `companies` (datos corporativos)

- ID del documento = mismo `uid` del usuario empresa.
- Campos: `company_name`, `category`, `products`, `address`, `company_code`, `country`, `credits`.
- Campo critico: `credits` se debe modificar solo en transacciones (compra/consumo de creditos).

### 4) `chats` (interacciones)

- ID recomendado: `uidCompany_uidInfluencer` para evitar duplicados.
- Campos: `participants`, `is_unlocked`, `last_message`, `updated_at`.
- Subcoleccion: `messages/{messageId}` con `sender_id`, `text`, `timestamp`.
- Recomendacion: cuando se envia mensaje, actualizar `last_message` y `updated_at` en el documento padre del chat.

### 5) `reviews` (reputacion)

- Campos: `influencer_id`, `company_id`, `rating`, `comment`, `created_at`.
- Recomendacion: evitar reviews duplicadas por campana usando un campo `campaign_id` o id compuesto.

### Indices sugeridos

- `influencers`: `category ASC, is_premium DESC`.
- `influencers`: `location ASC, is_premium DESC`.
- `chats`: `participants ARRAY_CONTAINS, updated_at DESC`.
- `reviews`: `influencer_id ASC, created_at DESC`.

### Reglas de seguridad (resumen)

- `users/{uid}`: solo `request.auth.uid == uid` puede leer/escribir su documento.
- `influencers/{uid}` y `companies/{uid}`: solo dueno escribe; lectura publica segun necesidad del negocio.
- `chats/{chatId}`: solo participantes pueden leer/escribir mensajes.
- `reviews`: solo empresas autenticadas crean; influencer solo lectura.

## Estructura del Proyecto

```
.
├── src/
│   ├── app/
│   │   ├── (auth)/          # Páginas de autenticación
│   │   ├── (dashboard)/     # Dashboards protegidos
│   │   ├── (public)/        # Páginas públicas
│   │   └── api/             # Route handlers (chat/company)
│   ├── features/
│   │   ├── auth/            # Estado y servicios de autenticación
│   │   ├── chat/            # Estado y servicios de chat
│   │   ├── company/         # Servicios de empresa (briefs)
│   │   ├── influencer/      # Servicios de discovery influencer
│   │   ├── onboarding/      # Servicios de onboarding
│   │   └── public-profile/  # Servicios de perfil público
│   ├── shared/
│   │   ├── components/      # Componentes reutilizables de UI/layout
│   │   └── lib/             # Integraciones Firebase y utilidades
│   └── tests/               # Tests (por implementar)
└── tools/fake-server/       # Socket server local para desarrollo
```

## Características Implementadas

### Validaciones
- ✅ Formularios con validación en tiempo real
- ✅ Mensajes de error descriptivos
- ✅ Estados de carga en acciones

### Interactividad
- ✅ Filtros de búsqueda funcionales
- ✅ Envío de mensajes en chat
- ✅ Edición de perfiles con persistencia (localStorage)
- ✅ Sistema de ratings con estrellas
- ✅ Navegación responsive

### Diseño
- ✅ Interfaz limpia y moderna
- ✅ Totalmente responsive (mobile-first)
- ✅ Navegación inferior en móviles
- ✅ Transiciones y hover states
- ✅ Tipografía: Outfit (Google Fonts)

## Limitaciones del MVP

⚠️ **Este es un MVP con funcionalidad simulada:**

- No hay backend real (todo funciona con mock data)
- Autenticacion con Firebase (sin backend propio para reglas de negocio avanzadas)
- Los datos se guardan en localStorage (se pierden al limpiar caché)
- No hay integración real con Instagram API
- Los filtros funcionan solo con los 20 influencers de prueba
- El sistema de créditos es solo visual (no hay pasarela de pagos)
- Las reviews no se pueden agregar desde la UI (están hardcodeadas)

## Próximas Mejoras (Fuera del MVP)

- [ ] Backend con API RESTful o GraphQL
- [ ] Base de datos real (PostgreSQL/MongoDB)
- [ ] Autenticación con JWT o NextAuth
- [ ] Integración real con Instagram API
- [ ] Sistema de pagos (Stripe/PayPal)
- [ ] Notificaciones en tiempo real (WebSockets)
- [ ] Sistema de reviews editable desde UI
- [ ] Panel de administración
- [ ] Analytics y reportes
- [ ] Múltiples redes sociales (TikTok, YouTube)

## Flujos de Usuario

### Flujo Influencer

1. Registro → Login
2. Completar perfil (bio, categorías, precios, portfolio)
3. (Opcional) Conectar Instagram
4. Recibir mensajes de empresas
5. Negociar términos en el chat
6. Completar colaboración
7. Recibir review de la empresa

### Flujo Empresa

1. Registro → Login
2. Completar perfil empresarial
3. Buscar influencers con filtros
4. Ver perfil detallado (métricas, reviews, portfolio)
5. Contactar influencer (consume 1 crédito)
6. Negociar en el chat
7. Cerrar colaboración
8. Dejar review al influencer

## Soporte

Para dudas o problemas:
- Revisar la documentación en `/docs` (por crear)
- Abrir un issue en GitHub

## Licencia

Privado - Uso interno únicamente

---

**Versión:** 1.0.0 MVP  
**Última actualización:** Abril 2026
