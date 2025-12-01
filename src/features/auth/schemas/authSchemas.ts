import * as yup from 'yup';
import { validateCPF } from '../../../utils/cpfValidation';
import { formatDateForAPI, unmaskDate } from '../../../utils/masks';

// Login form validation schema
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email é obrigatório')
    .email('Digite um email válido')
    .trim(),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .trim(),
});

// Register form validation schema
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .trim(),
  email: yup
    .string()
    .required('Email é obrigatório')
    .email('Digite um email válido')
    .trim(),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .trim(),
  confirmPassword: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('password')], 'As senhas não coincidem')
    .trim(),
  document: yup
    .string()
    .required('CPF é obrigatório')
    .test('valid-cpf', 'CPF inválido', (value) => {
      if (!value) return false;
      return validateCPF(value);
    }),
  phone: yup
    .string()
    .required('Telefone é obrigatório')
    .test('valid-phone', 'Telefone inválido. Use o formato (00) 00000-0000', (value) => {
      if (!value) return false;
      const unmasked = value.replace(/[^\d]/g, '');
      return unmasked.length >= 10 && unmasked.length <= 11;
    }),
  dateOfBirth: yup
    .string()
    .required('Data de nascimento é obrigatória')
    .test('valid-date', 'Data inválida. Use o formato dd/MM/yyyy', (value) => {
      if (!value) return false;
      const unmasked = unmaskDate(value);
      if (unmasked.length !== 8) return false;
      
      const day = parseInt(unmasked.slice(0, 2), 10);
      const month = parseInt(unmasked.slice(2, 4), 10);
      const year = parseInt(unmasked.slice(4, 8), 10);
      
      if (month < 1 || month > 12) return false;
      if (day < 1 || day > 31) return false;
      
      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        return false;
      }
      
      return true;
    })
    .test('age-validation', 'Você deve ter pelo menos 18 anos', (value) => {
      if (!value) return false;
      const apiDate = formatDateForAPI(value);
      const [year, month, day] = apiDate.split('-').map(Number);
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      
      const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
      return actualAge >= 18;
    }),
});

// Forgot password form validation schema
export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email é obrigatório')
    .email('Digite um email válido')
    .trim(),
});

// Reset password form validation schema
export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'A senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial'
    )
    .trim(),
  confirmPassword: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('password')], 'As senhas não coincidem')
    .trim(),
});

// Type definitions for form data
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;