import { useCallback, useState } from 'react';
import { useForm } from '../../hooks/form/useForm';
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from '../../schemas/authSchemas';

const useForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<typeof forgotPasswordSchema>({
    schema: forgotPasswordSchema,
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const handleForgotPassword = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setIsLoading(true);
        // TODO: Implement API call to forgot password endpoint
        // await authService.forgotPassword(data);
        console.log('Forgot password request:', data);
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        // TODO: Navigate to success screen or show success message
      } catch (error) {
        console.error('Forgot password error:', error);
        // TODO: Handle error appropriately
        form.setFieldError('email', 'Erro ao enviar email. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    },
    [form]
  );

  const handleSubmit = form.handleSubmit(handleForgotPassword);

  return {
    isLoading,
    handleSubmit,
    form,
  };
};

export default useForgotPasswordPage;

