import { useCallback, useState } from 'react';
import { RegisterRequest } from '../../../../features/auth/types';
import { ApiError } from '../../../../services/api/authService';
import { useForm } from '../../hooks/form/useForm';
import {
    RegisterFormData,
    registerSchema,
} from '../../schemas/authSchemas';
import { useRegisterMutation } from '../api/useRegisterMutation';

const useRegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const registerMutation = useRegisterMutation();

  const form = useForm<typeof registerSchema>({
    schema: registerSchema,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      document: '',
      phone: '',
      dateOfBirth: '',
    },
    mode: 'onChange',
  });

  const handleRegister = useCallback(
    async (data: RegisterFormData) => {
      try {
        // Prepare data for API
        const registerData: RegisterRequest = {
          name: data.name,
          email: data.email,
          password: data.password,
          document: data.document, // Already unmasked in form
          phone: data.phone, // Will be unmasked in service
          dateOfBirth: data.dateOfBirth, // Will be formatted in service
          role: 'USER',
        };

        await registerMutation.mutateAsync(registerData);
        // Navigation is handled in the mutation's onSuccess callback
      } catch (error) {
        const apiError = error as ApiError;
        
        // Handle different error types
        if (apiError.status === 400) {
          // Try to set error on appropriate field
          const errorMessage = apiError.message || 'Dados inválidos. Verifique os campos.';
          
          // Try to determine which field has the error
          if (errorMessage.toLowerCase().includes('email')) {
            form.setFieldError('email', errorMessage);
          } else if (errorMessage.toLowerCase().includes('cpf') || errorMessage.toLowerCase().includes('document')) {
            form.setFieldError('document', errorMessage);
          } else if (errorMessage.toLowerCase().includes('phone') || errorMessage.toLowerCase().includes('telefone')) {
            form.setFieldError('phone', errorMessage);
          } else {
            form.setFieldError('email', errorMessage);
          }
        } else if (apiError.status === 0) {
          // Network error
          form.setFieldError('email', 'Erro de conexão. Verifique sua internet.');
        } else {
          // Generic error
          form.setFieldError('email', apiError.message || 'Ocorreu um erro. Tente novamente.');
        }
      }
    },
    [registerMutation, form]
  );

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword(!showConfirmPassword);
  }, [showConfirmPassword]);

  const handleSubmit = form.handleSubmit(handleRegister);

  return {
    showPassword,
    showConfirmPassword,
    isLoading: registerMutation.isPending,
    handleShowPassword,
    handleShowConfirmPassword,
    handleSubmit,
    form,
  };
};

export default useRegisterPage;

