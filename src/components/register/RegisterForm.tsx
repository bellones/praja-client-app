import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { View } from 'react-native';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';
import { RegisterFormData } from '../../features/auth/schemas/authSchemas';
import createRegisterStyles from '../../features/auth/screens/register/RegisterStyles';
import { useTheme } from '../../theme/ThemeProvider';
import { Input } from '../input/Input';
import { MaskedInput } from '../input/MaskedInput';

type RegisterFormProps = {
  control: Control<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  showPassword: boolean;
  showConfirmPassword: boolean;
  handleShowPassword: () => void;
  handleShowConfirmPassword: () => void;
};

const RegisterForm = ({
  control,
  errors,
  showPassword,
  showConfirmPassword,
  handleShowPassword,
  handleShowConfirmPassword,
}: RegisterFormProps) => {
  const { theme } = useTheme();
  const styles = createRegisterStyles(theme);
  return (
    <View style={styles.formContainer}>
      <Input
        label="Nome completo"
        control={control}
        name="name"
        placeholder="Digite seu nome completo"
        error={errors.name?.message}
        autoCapitalize="words"
        autoComplete="name"
      />

      <MaskedInput
        label="Data de nascimento"
        control={control}
        name="dateOfBirth"
        mask="date"
        placeholder="dd/MM/yyyy"
        error={errors.dateOfBirth?.message}
        keyboardType="numeric"
      />

      <MaskedInput
        label="CPF"
        control={control}
        name="document"
        mask="cpf"
        placeholder="000.000.000-00"
        error={errors.document?.message}
        keyboardType="numeric"
      />

      <MaskedInput
        label="Telefone"
        control={control}
        name="phone"
        mask="phone"
        placeholder="(00) 00000-0000"
        error={errors.phone?.message}
        keyboardType="phone-pad"
      />

      <Input
        label="Email"
        control={control}
        name="email"
        placeholder="Digite seu email"
        error={errors.email?.message}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />

      <Input
        label="Senha"
        control={control}
        name="password"
        placeholder="Digite sua senha"
        error={errors.password?.message}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="password"
        rightIcon={
          showPassword ? (
            <EyeIcon size={20} color={theme.colors.text} />
          ) : (
            <EyeSlashIcon size={20} color={theme.colors.text} />
          )
        }
        onRightIconPress={handleShowPassword}
      />

      <Input
        label="Confirmar senha"
        control={control}
        name="confirmPassword"
        placeholder="Digite sua senha novamente"
        error={errors.confirmPassword?.message}
        secureTextEntry={!showConfirmPassword}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="password"
        rightIcon={
          showConfirmPassword ? (
            <EyeIcon size={20} color={theme.colors.text} />
          ) : (
            <EyeSlashIcon size={20} color={theme.colors.text} />
          )
        }
        onRightIconPress={handleShowConfirmPassword}
      />
    </View>
  );
};

export default RegisterForm;

