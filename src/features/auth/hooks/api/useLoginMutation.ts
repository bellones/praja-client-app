import { CommonActions, useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { LoginRequest } from '../../../../features/auth/types';
import { RootStackScreenProps } from '../../../../navigation/types';
import { ApiError, authService } from '../../../../services/api/authService';
import { useAuthStore } from '../../../../state';

export const useLoginMutation = () => {
  const navigation = useNavigation<RootStackScreenProps<'Auth'>['navigation']>();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (session) => {
      // Save session to Zustand store (will be persisted automatically)
      setSession(session);
      
      // Navigate to App screen after successful login
      // Using getParent to access RootStack navigator and replace the entire stack
      const rootNavigation = navigation.getParent();
      if (rootNavigation) {
        rootNavigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'App' }],
          })
        );
      }
    },
    onError: (error: ApiError) => {
      // Error is handled in the component using the mutation
      console.error('Login error:', error);
    },
  });
};

