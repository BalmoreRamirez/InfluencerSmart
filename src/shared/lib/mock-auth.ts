export type MockRole = "influencer" | "empresa";

export type MockUser = {
  email: string;
  password: string;
  role: MockRole;
  redirectTo: string;
};

export type MockSession = {
  email: string;
  role: MockRole;
  loginAt: string;
};

export const mockUsers: MockUser[] = [
  {
    email: "influencer@influencersmart.dev",
    password: "Influencer123!",
    role: "influencer",
    redirectTo: "/influencer",
  },
  {
    email: "empresa@influencersmart.dev",
    password: "Empresa123!",
    role: "empresa",
    redirectTo: "/empresa",
  },
];

export function authenticateMockUser(email: string, password: string): MockUser | null {
  const normalizedEmail = email.trim().toLowerCase();
  return (
    mockUsers.find(
      (user) => user.email.toLowerCase() === normalizedEmail && user.password === password
    ) ?? null
  );
}

export function saveMockSession(user: MockUser) {
  const session: MockSession = {
    email: user.email,
    role: user.role,
    loginAt: new Date().toISOString(),
  };

  localStorage.setItem("influencer-smart:session", JSON.stringify(session));
}

export function getMockSession(): MockSession | null {
  if (typeof window === "undefined") return null;
  
  try {
    const raw = localStorage.getItem("influencer-smart:session");
    if (!raw) return null;
    return JSON.parse(raw) as MockSession;
  } catch {
    return null;
  }
}

export function clearMockSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("influencer-smart:session");
}

export function isAuthenticated(): boolean {
  return getMockSession() !== null;
}

export function hasRole(role: MockRole): boolean {
  const session = getMockSession();
  return session?.role === role;
}
