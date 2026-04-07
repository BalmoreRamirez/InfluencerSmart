export type MockRole = "influencer" | "empresa";

export type MockUser = {
  email: string;
  password: string;
  role: MockRole;
  redirectTo: string;
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
  const session = {
    email: user.email,
    role: user.role,
    loginAt: new Date().toISOString(),
  };

  localStorage.setItem("influencer-smart:session", JSON.stringify(session));
}
