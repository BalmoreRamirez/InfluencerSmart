# InfluencerSmart - MVP

Plataforma que conecta influencers con empresas para colaboraciones efectivas y transparentes.

## Stack Tecnológico

- Next.js 16.2.2 (App Router)
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
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

**Perfil Influencer:**
- Email: `influencer@influencersmart.dev`
- Password: `Influencer123!`

**Perfil Empresa:**
- Email: `empresa@influencersmart.dev`
- Password: `Empresa123!`

### Datos Simulados

- **20+ influencers** de diversos países (México, Colombia, España, Argentina, Chile, Perú)
- **15+ categorías** (Tecnología, Fitness, Gastronomía, Viajes, Gaming, Belleza, etc.)
- **25 reviews** distribuidas entre influencers
- **10 conversaciones** de ejemplo
- **Métricas de Instagram** simuladas para el perfil principal

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
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── (auth)/              # Páginas de autenticación
│   │   ├── login/           # Inicio de sesión
│   │   └── registro/        # Registro de usuarios
│   ├── (dashboard)/         # Dashboards protegidos
│   │   ├── influencer/      # Panel del influencer
│   │   ├── empresa/         # Panel de la empresa
│   │   └── chat/            # Sistema de mensajería
│   └── (public)/            # Páginas públicas
│       ├── explorar/        # Buscador de influencers
│       └── influencer/      # Perfiles públicos
├── shared/
│   ├── components/          # Componentes reutilizables
│   │   ├── layout/          # Navegación y estructura
│   │   └── ui/              # Componentes UI (cards, etc)
│   └── lib/                 # Utilidades y datos
│       ├── mock-auth.ts     # Autenticación simulada
│       └── mock-data.ts     # Base de datos simulada
└── tests/                   # Tests (por implementar)
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
- La autenticación es simulada (sin JWT ni sesiones reales)
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
