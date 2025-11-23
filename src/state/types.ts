export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Session {
  access_token: string;
  user: User;
}

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setSession: (session: Session) => void;
  clearSession: () => void;
  updateUser: (user: Partial<User>) => void;
}

