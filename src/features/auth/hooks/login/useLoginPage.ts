import { useCallback, useState } from 'react';
import { useForm } from '../../hooks/form/useForm';
import { LoginFormData, loginSchema } from '../../schemas/authSchemas';
import { useLoginMutation } from '../api/useLoginMutation';
import { ApiError } from '../../../../services/api/authService';

const useLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLoginMutation();

  const form = useForm<typeof loginSchema>({
    schema: loginSchema,
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const handleLogin = useCallback(
    async (data: LoginFormData) => {
      try {
        await loginMutation.mutateAsync(data);
        // Navigation is handled in the mutation's onSuccess callback
      } catch (error) {
        const apiError = error as ApiError;
        
        // Handle different error types
        if (apiError.status === 401) {
          form.setFieldError('email', 'Email ou senha inválidos.');
          form.setFieldError('password', '');
        } else if (apiError.status === 400) {
          // Try to set error on appropriate field
          const errorMessage = apiError.message || 'Dados inválidos. Verifique os campos.';
          form.setFieldError('email', errorMessage);
        } else if (apiError.status === 0) {
          // Network error
          form.setFieldError('email', 'Erro de conexão. Verifique sua internet.');
        } else {
          // Generic error
          form.setFieldError('email', apiError.message || 'Ocorreu um erro. Tente novamente.');
        }
      }
    },
    [loginMutation, form]
  );

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleSubmit = form.handleSubmit(handleLogin);

  return {
    showPassword,
    isLoading: loginMutation.isPending,
    handleShowPassword,
    handleSubmit,
    form,
  };
};

export default useLoginPage;