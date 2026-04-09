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
  avatarUrl?: string;
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
  averageRating?: number;
  totalReviews?: number;
  instagramConnected?: boolean;
  instagramMetrics?: {
    monthlyReach: string;
    storyViews: string;
    demographics: {
      age: string;
      gender: string;
      topCountries: string[];
    };
  };
};

export type CompanyProfile = {
  name: string;
  avatarUrl?: string;
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

export type Review = {
  id: string;
  influencerHandle: string;
  companyName: string;
  rating: number;
  comment: string;
  date: string;
  campaign: string;
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
  {
    name: "Carlos Biz Mind",
    category: "Negocios",
    country: "España",
    followers: "320k",
    price: "$450 USD",
    engagement: "3.8%",
    rating: "4.7",
  },
  {
    name: "Ana Fashion Life",
    category: "Moda",
    country: "Argentina",
    followers: "680k",
    price: "$620 USD",
    engagement: "5.5%",
    rating: "4.9",
  },
  {
    name: "Roberto Eco Green",
    category: "Sustentabilidad",
    country: "Chile",
    followers: "195k",
    price: "$210 USD",
    engagement: "4.2%",
    rating: "4.5",
  },
  {
    name: "Lucia Health Hub",
    category: "Salud",
    country: "Colombia",
    followers: "440k",
    price: "$410 USD",
    engagement: "4.9%",
    rating: "4.8",
  },
  {
    name: "Diego Auto Freak",
    category: "Autos",
    country: "Mexico",
    followers: "380k",
    price: "$360 USD",
    engagement: "4.4%",
    rating: "4.6",
  },
  {
    name: "Patricia Book Club",
    category: "Libros",
    country: "España",
    followers: "240k",
    price: "$180 USD",
    engagement: "5.8%",
    rating: "4.9",
  },
  {
    name: "Marco Music Vibes",
    category: "Musica",
    country: "Peru",
    followers: "520k",
    price: "$480 USD",
    engagement: "6.1%",
    rating: "4.8",
  },
  {
    name: "Elena Pet Love",
    category: "Mascotas",
    country: "Argentina",
    followers: "410k",
    price: "$320 USD",
    engagement: "7.2%",
    rating: "4.9",
  },
  {
    name: "Fernando Finance Pro",
    category: "Finanzas",
    country: "Mexico",
    followers: "295k",
    price: "$380 USD",
    engagement: "3.5%",
    rating: "4.7",
  },
  {
    name: "Gabriela Arte Visual",
    category: "Arte",
    country: "Colombia",
    followers: "175k",
    price: "$220 USD",
    engagement: "5.3%",
    rating: "4.6",
  },
  {
    name: "Miguel Sports Pro",
    category: "Deportes",
    country: "España",
    followers: "640k",
    price: "$590 USD",
    engagement: "5.7%",
    rating: "4.9",
  },
  {
    name: "Isabel Home Decor",
    category: "Decoracion",
    country: "Chile",
    followers: "330k",
    price: "$290 USD",
    engagement: "4.6%",
    rating: "4.7",
  },
  {
    name: "Ricardo Tech Reviews",
    category: "Tecnologia",
    country: "Peru",
    followers: "485k",
    price: "$420 USD",
    engagement: "4.3%",
    rating: "4.8",
  },
  {
    name: "Valentina Lifestyle",
    category: "Lifestyle",
    country: "Argentina",
    followers: "560k",
    price: "$510 USD",
    engagement: "5.4%",
    rating: "4.8",
  },
];

export const influencerMetrics: MetricItem[] = [
  { label: "Visitas perfil", value: "12,480", hint: "+18% este mes" },
  { label: "Tasa de respuesta", value: "92%", hint: "Promedio 24h" },
  { label: "Ingresos mensuales", value: "$2,740", hint: "3 acuerdos activos" },
  { label: "Servicios cerrados", value: "28", hint: "Historico" },
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
  { name: "TechHub MX", last: "Perfecto, acepto la propuesta!", unread: 0 },
  { name: "ActiveWear Co", last: "Cuando podrias empezar?", unread: 3 },
  { name: "WanderLux Hotels", last: "Las fotos quedaron increibles", unread: 0 },
  { name: "ProGaming Gear", last: "Necesitamos cambiar la fecha", unread: 1 },
  { name: "StartupHub", last: "Aun no recibo el contrato", unread: 0 },
  { name: "Elegance Boutique", last: "Podemos hacer una videollamada?", unread: 2 },
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
  averageRating: 4.7,
  totalReviews: 3,
  instagramConnected: true,
  instagramMetrics: {
    monthlyReach: "1.2M",
    storyViews: "85k promedio",
    demographics: {
      age: "18-34 años (78%)",
      gender: "Mujeres 62%, Hombres 38%",
      topCountries: ["Mexico 45%", "Colombia 18%", "España 12%"],
    },
  },
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

// Reviews data
export const allReviews: Review[] = [
  {
    id: "r1",
    influencerHandle: "@valeriatechh",
    companyName: "GlowFit Labs",
    rating: 5,
    comment: "Excelente profesionalismo y entrega a tiempo. El contenido superó nuestras expectativas y la interacción con su audiencia fue increíble.",
    date: "2026-03-28",
    campaign: "Lanzamiento SmartBottle"
  },
  {
    id: "r2",
    influencerHandle: "@valeriatechh",
    companyName: "BytePhones",
    rating: 5,
    comment: "Muy profesional, creativa y con gran engagement. Definitivamente volveremos a trabajar juntos.",
    date: "2026-02-15",
    campaign: "Review modelo X Pro"
  },
  {
    id: "r3",
    influencerHandle: "@valeriatechh",
    companyName: "TechHub MX",
    rating: 4,
    comment: "Buen trabajo en general, aunque el contenido llegó 1 día después de lo acordado. Sin embargo, la calidad fue excelente.",
    date: "2026-01-10",
    campaign: "Campaña Back to School"
  },
  {
    id: "r4",
    influencerHandle: "@sofiafitlife",
    companyName: "NutriVital",
    rating: 5,
    comment: "Sofia es increíble. Su autenticidad y conocimiento del nicho fitness es evidente. Los resultados superaron nuestras proyecciones.",
    date: "2026-03-20",
    campaign: "Suplementos Spring Collection"
  },
  {
    id: "r5",
    influencerHandle: "@sofiafitlife",
    companyName: "ActiveWear Co",
    rating: 5,
    comment: "Colaboración perfecta. Comunicación fluida y contenido de alta calidad. 100% recomendada.",
    date: "2026-02-05",
    campaign: "Nueva línea deportiva"
  },
  {
    id: "r6",
    influencerHandle: "@nicofoodlab",
    companyName: "GreenBites",
    rating: 5,
    comment: "Nico tiene un talento único para crear contenido gastronómico atractivo. Su audiencia está muy comprometida.",
    date: "2026-03-25",
    campaign: "Recetas veganas"
  },
  {
    id: "r7",
    influencerHandle: "@nicofoodlab",
    companyName: "Kitchen Tools Pro",
    rating: 4,
    comment: "Muy buen contenido, aunque nos hubiera gustado más variedad en los formatos. Aun así, estamos satisfechos.",
    date: "2026-01-30",
    campaign: "Utensilios premium"
  },
  {
    id: "r8",
    influencerHandle: "@miatravelframe",
    companyName: "WanderLux Hotels",
    rating: 5,
    comment: "Las fotos de Mia son simplemente espectaculares. Capturó la esencia de nuestros hoteles perfectamente.",
    date: "2026-03-15",
    campaign: "Hoteles boutique LATAM"
  },
  {
    id: "r9",
    influencerHandle: "@miatravelframe",
    companyName: "TravelGear",
    rating: 5,
    comment: "Profesional, puntual y con una estética visual impecable. Definitivamente la mejor inversión del Q1.",
    date: "2026-02-20",
    campaign: "Mochilas de viaje"
  },
  {
    id: "r10",
    influencerHandle: "@miatravelframe",
    companyName: "AirConnect",
    rating: 4,
    comment: "Buen trabajo. El contenido fue bueno pero esperábamos un poco más de storytelling.",
    date: "2026-01-12",
    campaign: "Nueva ruta Cancún-Madrid"
  },
  {
    id: "r11",
    influencerHandle: "@danielgamerhub",
    companyName: "ProGaming Gear",
    rating: 5,
    comment: "Daniel tiene una audiencia muy engaged. Los streams fueron un éxito total y las ventas superaron las expectativas.",
    date: "2026-03-18",
    campaign: "Lanzamiento teclado RGB"
  },
  {
    id: "r12",
    influencerHandle: "@laurabeautyspot",
    companyName: "NeoSkin",
    rating: 5,
    comment: "Laura es una profesional increíble. Su conocimiento en skincare es evidente y su audiencia confía en ella.",
    date: "2026-03-10",
    campaign: "Rutina de cuidado diario"
  },
  {
    id: "r13",
    influencerHandle: "@carlosbizmind",
    companyName: "StartupHub",
    rating: 4,
    comment: "Contenido de calidad y bien estructurado. Nos hubiera gustado más interacción en tiempo real.",
    date: "2026-02-28",
    campaign: "Webinar emprendimiento"
  },
  {
    id: "r14",
    influencerHandle: "@anafashionlife",
    companyName: "Elegance Boutique",
    rating: 5,
    comment: "Ana tiene un ojo increíble para la moda. El lookbook quedó espectacular y generó muchas ventas.",
    date: "2026-03-22",
    campaign: "Colección Primavera 2026"
  },
  {
    id: "r15",
    influencerHandle: "@robertoecogreen",
    companyName: "EcoLife Products",
    rating: 5,
    comment: "Roberto transmite los valores de sustentabilidad de forma auténtica. Excelente colaboración.",
    date: "2026-02-14",
    campaign: "Productos eco-friendly"
  },
  {
    id: "r16",
    influencerHandle: "@luciahealthhub",
    companyName: "VitalCare",
    rating: 5,
    comment: "Lucia es una experta en salud y bienestar. Su audiencia valora mucho sus recomendaciones.",
    date: "2026-03-05",
    campaign: "Suplementos vitamínicos"
  },
  {
    id: "r17",
    influencerHandle: "@diegoautofreak",
    companyName: "MotorMax",
    rating: 4,
    comment: "Buenos reviews técnicos. El contenido llegó a tiempo aunque esperábamos más tomas en exteriores.",
    date: "2026-02-18",
    campaign: "Test Drive SUV eléctrica"
  },
  {
    id: "r18",
    influencerHandle: "@patriciabookclub",
    companyName: "Editorial Planeta",
    rating: 5,
    comment: "Patricia tiene una comunidad lectora muy activa. Sus reseñas son detalladas y honestas.",
    date: "2026-03-01",
    campaign: "Lanzamiento novela histórica"
  },
  {
    id: "r19",
    influencerHandle: "@marcomusicvibes",
    companyName: "SoundWave Audio",
    rating: 5,
    comment: "Marco sabe cómo conectar con su audiencia musical. El unboxing fue muy entretenido.",
    date: "2026-02-25",
    campaign: "Audífonos premium"
  },
  {
    id: "r20",
    influencerHandle: "@elenapetlove",
    companyName: "PawsCare",
    rating: 5,
    comment: "Elena es una amante genuina de las mascotas. Su contenido es adorable y muy efectivo.",
    date: "2026-03-12",
    campaign: "Línea de snacks saludables"
  },
  {
    id: "r21",
    influencerHandle: "@fernandofinancepro",
    companyName: "InvestSmart",
    rating: 4,
    comment: "Contenido educativo de calidad. Fernando explica conceptos complejos de forma clara.",
    date: "2026-02-08",
    campaign: "Plataforma de inversiones"
  },
  {
    id: "r22",
    influencerHandle: "@gabrielaartevisual",
    companyName: "ArtGallery MX",
    rating: 5,
    comment: "Gabriela tiene un talento único para comunicar arte. La promoción de la expo fue perfecta.",
    date: "2026-01-25",
    campaign: "Exposición arte contemporáneo"
  },
  {
    id: "r23",
    influencerHandle: "@miguelsportspro",
    companyName: "SportTech",
    rating: 5,
    comment: "Miguel es un atleta comprometido. Su review del smartwatch fue técnica y honesta.",
    date: "2026-03-08",
    campaign: "Reloj deportivo GPS"
  },
  {
    id: "r24",
    influencerHandle: "@isabelhomedecor",
    companyName: "HomeStyle",
    rating: 5,
    comment: "Isabel tiene un gusto exquisito para la decoración. Las fotos quedaron hermosas.",
    date: "2026-02-16",
    campaign: "Colección muebles minimalistas"
  },
  {
    id: "r25",
    influencerHandle: "@ricardotechreviews",
    companyName: "TechWorld",
    rating: 5,
    comment: "Ricardo hace reviews muy completos y objetivos. Su audiencia valora mucho su opinión.",
    date: "2026-03-20",
    campaign: "Laptop gaming nueva generación"
  }
];
