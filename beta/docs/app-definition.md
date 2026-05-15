# Documento de Definicion de Negocio

## Plataforma de Influencer Marketing (Latam)

### 1. Vision general

Plataforma web responsive diseniada para conectar empresas con influencers en
Latinoamerica. El sistema centraliza el descubrimiento, contacto y negociacion de
campanias de marketing, delegando la ejecucion del pago del acuerdo (deal) a medios
externos en esta fase inicial.

### 2. Actores del sistema

| Actor | Rol principal | Responsabilidades |
| --- | --- | --- |
| Empresa | Contratante | Busca, filtra, contacta influencers y gestiona propuestas comerciales. |
| Influencer | Creador de contenido | Crea su perfil profesional, recibe propuestas y negocia tarifas. |
| Admin | Moderador / Operador | Gestiona la economia del sistema, usuarios y configuraciones globales. |

### 3. Modelo de negocio y monetizacion

La plataforma utiliza un modelo hibrido de Suscripcion (SaaS) y Consumo (Creditos).

#### 3.1 Estructura de pagos

Empresas:
- Suscripcion mensual: pago fijo para mantener el acceso a la plataforma.
- Sistema de creditos: pago por consumo para iniciar nuevas conversaciones.

Influencers:
- Suscripcion mensual: pago fijo por visibilidad y acceso a propuestas.
- Bono de entrada: primer mes gratuito (periodo de prueba).

#### 3.2 Logica de creditos y umbral de seguridad

Para combatir la fuga de la plataforma y asegurar la recurrencia, se aplica la Regla
del Umbral:

- Bono de bienvenida: $10 en creditos al completar el onboarding (empresas).
- Umbral minimo: $5. Si el saldo de la empresa cae por debajo de este monto, todos
  los chats se bloquean automaticamente (modo lectura).
- Reactivacion: el acceso total se restablece inmediatamente al realizar una recarga
  que supere el umbral.
- Personalizacion: la empresa puede subir su umbral (ej. a $20) para recibir alertas
  tempranas, pero nunca bajarlo de $5.

### 4. Flujo principal de operacion

1. Registro y onboarding: seleccion de rol y completado de perfil (obligatorio para operar).
2. Discovery: la empresa utiliza filtros avanzados (nicho, seguidores, engagement, ubicacion).
3. Apertura de chat: la empresa inicia conversacion (consume creditos segun tarifa de Admin).
4. Negociacion:
   - Uso de chat en tiempo real.
   - Envio de propuesta estructurada (tarifa, entregables, fechas).
   - Aceptacion o contraoferta por parte del influencer.
5. Cierre del deal: una vez aceptada la propuesta, el acuerdo se ejecuta fuera de la plataforma.

### 5. Especificaciones tecnicas (V1)

#### 5.1 Perfil del influencer

- Datos manuales: foto, bio, nicho, ubicacion y disponibilidad.
- Metricas de redes: Instagram, TikTok, Facebook y YouTube (seguidores y engagement rate cargados manualmente).
- Tarifario: tarifas base por tipo de publicacion.

#### 5.2 Sistema de chat

- Interfaz de mensajeria en tiempo real.
- Componente de "Propuesta Formal" embebido en la conversacion.
- Bloqueo visual de interfaz cuando el saldo es < umbral.

#### 5.3 Integracion de pagos (Stripe)

- Stripe Billing: gestion de suscripciones recurrentes de ambos actores.
- Stripe Checkout: compra de paquetes de creditos.
- Webhooks: sincronizacion de eventos de pago con el saldo local en base de datos.

### 6. Panel de administracion (variables globales)

El administrador tiene control total sobre los parametros economicos para ajustar la rentabilidad:

| Variable | Valor defecto | Descripcion |
| --- | --- | --- |
| costo_inicio_chat | A definir | Creditos descontados al abrir un hilo nuevo. |
| umbral_minimo_global | $5.00 | Limite inferior para el bloqueo de chats. |
| bono_bienvenida | $10.00 | Creditos gratuitos iniciales para empresas. |
| periodo_prueba_inf | 1 mes | Tiempo de gracia para nuevos influencers. |
| precio_sus_empresa | A definir | Costo mensual de la suscripcion B2B. |
| precio_sus_influencer | A definir | Costo mensual de la suscripcion para creadores. |

### 7. Alcance de la V1 (perimetro)

Incluye:
- Auth por roles.
- Onboarding.
- Motor de busqueda con filtros.
- Chat operativo.
- Logica de creditos/umbral.
- Integracion con Stripe.
- Panel Admin.

### Registro inicial influencer y empresa
-username
-email
-password
-role

### Registro final influencer y empresa
    ## Influencer onboarding
    -fullName
    -birthDate
    -dui
    -country
    -city
    -niche
    -bio
    -socialAccounts[]
    -servicePricing[]
    -availablePlatforms[]
    -availability
    -profilePhoto

    ##Empresa onboarding
    -companyName
    -companyCode
    -industry
    -products[]
    -country
    -city
    -address
    -description
    -minimumThreshold
    -profilePhoto