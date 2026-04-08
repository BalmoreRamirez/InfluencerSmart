// Archivo legado: mantenemos tipos por compatibilidad historica.
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

export const mockUsers: MockUser[] = [];
