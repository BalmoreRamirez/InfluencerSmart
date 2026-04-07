export type MetricItem = {
  label: string;
  value: string;
  hint?: string;
};

export type InfluencerProfile = {
  name: string;
  category: string;
  country: string;
  followers: string;
  price: string;
  engagement: string;
  rating: string;
};

export type InfluencerDetailedProfile = {
  fullName: string;
  handle: string;
  location: string;
  categories: string[];
  bio: string;
  followers: string;
  avgReach: string;
  engagementRate: string;
  estimatedPrice: string;
  completedServices: number;
  languages: string[];
  portfolio: string[];
};

export type CompanyProfile = {
  name: string;
  industry: string;
  country: string;
  city: string;
  contactName: string;
  monthlyBudget: string;
  availableCredits: number;
  activeCampaigns: number;
  goals: string[];
  preferredCategories: string[];
  about: string;
};

export type ServiceHistoryItem = {
  brand: string;
  campaign: string;
  amount: string;
  status: string;
  deliveryDate: string;
};

export type SuggestedInfluencer = {
  name: string;
  score: string;
  price: string;
  niche: string;
};

export type ConversationPreview = {
  name: string;
  last: string;
  unread: number;
};

export type ChatMessage = {
  by: "empresa" | "influencer";
  text: string;
  at: string;
};

export const influencerFlow = [
  "Registro gratuito.",
  "Crear perfil publico (bio, categorias, paises y precio estimado).",
  "Conectar Instagram para importar metricas automaticamente.",
  "Subir portafolio con fotos, links y trabajos previos.",
  "Activar suscripcion mensual para ganar visibilidad.",
  "Recibir notificaciones cuando una empresa envia un mensaje.",
  "Responder desde el chat y negociar precio y terminos.",
  "Cerrar el acuerdo y registrar el servicio realizado.",
];

export const companyFlow = [
  "Registro gratuito.",
  "Buscar influencers con filtros por pais, categoria, seguidores y precio.",
  "Revisar perfiles completos con metricas, portafolio y resenas.",
  "Seleccionar perfiles de interes y enviar mensaje.",
  "Si hay creditos: se abre chat y descuenta 1 credito.",
  "Si no hay creditos: comprar paquete y continuar.",
  "Enviar brief de campana y negociar en el chat.",
  "Cerrar acuerdo directo con influencer.",
];

export const mvpCapabilities = [
  "Perfiles publicos de influencers con metricas y portafolio.",
  "Buscador para empresas con filtros por pais, categoria y precio.",
  "Sistema de creditos para iniciar conversaciones.",
  "Historial y registro de servicios por cada colaboracion.",
];

export const searchFilters = {
  country: "Mexico",
  category: "Tecnologia",
  followers: "100k+",
  priceRange: "$200 - $700",
};

export const influencers: InfluencerProfile[] = [
  {
    name: "Valeria Tech",
    category: "Tecnologia",
    country: "Mexico",
    followers: "420k",
    price: "$380 USD",
    engagement: "4.8%",
    rating: "4.9",
  },
  {
    name: "Sofia Fit Life",
    category: "Fitness",
    country: "Colombia",
    followers: "610k",
    price: "$520 USD",
    engagement: "5.1%",
    rating: "4.8",
  },
  {
    name: "Nico Food Lab",
    category: "Gastronomia",
    country: "Chile",
    followers: "280k",
    price: "$290 USD",
    engagement: "6.3%",
    rating: "4.7",
  },
  {
    name: "Mia Travel Frame",
    category: "Viajes",
    country: "Argentina",
    followers: "355k",
    price: "$340 USD",
    engagement: "4.5%",
    rating: "4.6",
  },
  {
    name: "Daniel Gamer Hub",
    category: "Gaming",
    country: "Peru",
    followers: "790k",
    price: "$710 USD",
    engagement: "5.9%",
    rating: "4.9",
  },
  {
    name: "Laura Beauty Spot",
    category: "Belleza",
    country: "Mexico",
    followers: "510k",
    price: "$490 USD",
    engagement: "5.2%",
    rating: "4.8",
  },
];

export const influencerMetrics: MetricItem[] = [
  { label: "Visitas perfil", value: "12,480", hint: "+18% este mes" },
  { label: "Tasa de respuesta", value: "92%", hint: "Promedio 24h" },
  { label: "Ingresos mensuales", value: "$2,740", hint: "3 acuerdos activos" },
  { label: "Servicios cerrados", value: "28", hint: "Historico" },
];

export const influencerServiceHistory: ServiceHistoryItem[] = [
  {
    brand: "GlowFit",
    campaign: "Lanzamiento SmartBottle",
    amount: "$650",
    status: "Completado",
    deliveryDate: "2026-03-28",
  },
  {
    brand: "BytePhones",
    campaign: "Review del nuevo modelo X",
    amount: "$420",
    status: "En revision",
    deliveryDate: "2026-04-02",
  },
  {
    brand: "GreenBites",
    campaign: "Receta patrocinada",
    amount: "$280",
    status: "Pagado",
    deliveryDate: "2026-03-21",
  },
  {
    brand: "NeoSkin",
    campaign: "Rutina de cuidado diario",
    amount: "$560",
    status: "Programado",
    deliveryDate: "2026-04-10",
  },
];

export const companyMetrics: MetricItem[] = [
  { label: "Creditos disponibles", value: "14", hint: "1 credito por nuevo chat" },
  { label: "Campanas activas", value: "5", hint: "2 en negociacion" },
  { label: "Respuestas 24h", value: "81%", hint: "Mejora semanal" },
  { label: "Presupuesto mes", value: "$12,500", hint: "62% ejecutado" },
];

export const suggestedInfluencers: SuggestedInfluencer[] = [
  { name: "Valeria Tech", score: "96", price: "$380", niche: "Tecnologia" },
  { name: "Sofia Fit Life", score: "91", price: "$520", niche: "Fitness" },
  { name: "Nico Food Lab", score: "88", price: "$290", niche: "Gastronomia" },
  { name: "Mia Travel Frame", score: "86", price: "$340", niche: "Viajes" },
];

export const campaignDraft = {
  objective: "Awareness del nuevo producto SmartBottle",
  details:
    "Buscamos 3 reels + 2 stories mostrando uso diario del producto durante 7 dias.",
};

export const conversations: ConversationPreview[] = [
  { name: "GlowFit", last: "Podemos ajustar entrega al viernes?", unread: 2 },
  { name: "BytePhones", last: "Te comparto el brief final.", unread: 0 },
  { name: "GreenBites", last: "Confirmado, cerramos en $280.", unread: 0 },
  { name: "NeoSkin", last: "Validamos guion y lanzamos manana.", unread: 1 },
];

export const activeChat = {
  contactName: "GlowFit",
  state: "Negociacion activa",
};

export const chatThread: ChatMessage[] = [
  {
    by: "empresa",
    text: "Hola, buscamos promocionar SmartBottle en Instagram Reels.",
    at: "09:12",
  },
  {
    by: "influencer",
    text: "Perfecto, mi tarifa estimada es $380 e incluye 1 reel + 3 stories.",
    at: "09:18",
  },
  {
    by: "empresa",
    text: "Aprobado. Enviame fechas disponibles y cerramos hoy.",
    at: "09:21",
  },
  {
    by: "influencer",
    text: "Tengo espacio para proxima semana. Te envio propuesta final.",
    at: "09:25",
  },
];

export const serviceFormDefaults = {
  brand: "GlowFit",
  campaign: "Lanzamiento SmartBottle",
  deliveryDate: "2026-04-20",
  amount: "$650",
  description:
    "1 reel + 3 stories + link en bio por 48 horas. Entrega con reporte de alcance y clics.",
};

export const influencerProfile: InfluencerDetailedProfile = {
  fullName: "Valeria Torres",
  handle: "@valeriatech",
  location: "Ciudad de Mexico, Mexico",
  categories: ["Tecnologia", "Gadgets", "Apps"],
  bio: "Creadora de contenido tech enfocada en reviews honestas, tutoriales y comparativas para consumidores digitales.",
  followers: "420k",
  avgReach: "210k",
  engagementRate: "4.8%",
  estimatedPrice: "$380 USD",
  completedServices: 28,
  languages: ["Espanol", "Ingles"],
  portfolio: [
    "Review SmartBottle x GlowFit",
    "Unboxing Phone X x BytePhones",
    "Guia de productividad con tablet Pro",
  ],
};

export const companyProfile: CompanyProfile = {
  name: "GlowFit Labs",
  industry: "Fitness & Wellness",
  country: "Mexico",
  city: "Monterrey",
  contactName: "Andrea Martinez",
  monthlyBudget: "$12,500 USD",
  availableCredits: 14,
  activeCampaigns: 5,
  goals: [
    "Incrementar awareness en Gen Z",
    "Generar trafico cualificado al ecommerce",
    "Mejorar conversion en lanzamiento de productos",
  ],
  preferredCategories: ["Fitness", "Tecnologia", "Lifestyle"],
  about:
    "Marca de bienestar digital que colabora con influencers para educar, inspirar y acelerar adopcion de nuevos productos.",
};
