// Common authentication types
import { Session, User } from '../../../state/types';

// Request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  document: string; // CPF (11 digits, unmasked)
  phone: string; // Brazilian phone (unmasked)
  dateOfBirth: string; // yyyy-MM-dd format
  role: 'USER';
}

// Response types
export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface RegisterResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

// Re-export common types
export type { Session, User };

