import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, Session, User } from './types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,

      setSession: (session: Session) => {
        set({
          accessToken: session.access_token,
          user: session.user,
          isAuthenticated: true,
        });
      },

      clearSession: () => {
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (updatedUser: Partial<User>) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              ...updatedUser,
            },
          };
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

