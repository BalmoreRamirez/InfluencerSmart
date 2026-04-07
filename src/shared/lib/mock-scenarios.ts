export const businessScenarios = [
  {
    slug: "sin-creditos",
    title: "Empresa sin creditos",
    description:
      "La empresa intenta contactar influencer, pero no tiene creditos disponibles para abrir chat.",
    route: "/empresa/sin-creditos",
    impact: "Bloquea nuevos chats hasta comprar paquete.",
  },
  {
    slug: "campana-cerrada",
    title: "Campana cerrada",
    description:
      "La campana fue negociada y cerrada correctamente entre empresa e influencer.",
    route: "/empresa/campana-cerrada",
    impact: "Pasa a seguimiento de entregables y resultado.",
  },
  {
    slug: "chat-sin-respuesta",
    title: "Chat sin respuesta",
    description:
      "La empresa envio brief y no recibe respuesta del influencer dentro del SLA esperado.",
    route: "/chat/sin-respuesta",
    impact: "Dispara recordatorio y sugerencia de alternativas.",
  },
  {
    slug: "servicio-vencido",
    title: "Servicio vencido",
    description:
      "El influencer tiene una entrega vencida sin marcar como completada.",
    route: "/influencer/servicio-vencido",
    impact: "Afecta reputacion y tasa de respuesta visible para empresas.",
  },
];
