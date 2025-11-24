import { useMutation } from '@tanstack/react-query';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { authService, ApiError } from '../../../../services/api/authService';
import { useAuthStore } from '../../../../state';
import { RootStackScreenProps } from '../../../../navigation/types';
import { RegisterRequest } from '../../../../features/auth/types';

export const useRegisterMutation = () => {
  const navigation = useNavigation<RootStackScreenProps<'Auth'>['navigation']>();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (session) => {
      // Save session to Zustand store (will be persisted automatically)
      setSession(session);
      
      // Navigate to App screen after successful registration
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
      console.error('Register error:', error);
    },
  });
};

