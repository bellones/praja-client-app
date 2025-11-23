import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { View } from 'react-native';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';
import { LoginFormData } from '../../features/auth/schemas/authSchemas';
import createLoginStyles from '../../features/auth/screens/login/LoginStyles';
import { useTheme } from '../../theme/ThemeProvider';
import { fontWeights } from '../../theme/fonts';
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import Spacer from '../spacer/Spacer';
import TextButton from '../textbutton/TextButton';


type LoginFormProps = {
  control: Control<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  showPassword: boolean;
  isLoading: boolean;
  handleShowPassword: () => void;
  handleSubmit: () => void;
};

const LoginForm = ({
  control,
  errors,
  showPassword,
  isLoading,
  handleShowPassword,
  handleSubmit,
}: LoginFormProps) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createLoginStyles(theme);

  return (
    <View style={styles.formContainer}>
      <Spacer size={theme.spacing(12)} />
      
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
            <EyeIcon color={theme.colors.text} />
          ) : (
            <EyeSlashIcon color={theme.colors.text} />
          )
        }
        onRightIconPress={handleShowPassword}
      />

      <TextButton
        text="Esqueceu sua senha?"
        onPress={() => navigation.navigate('ForgetPassword' as never)}
        position="right"
        variant="ghost"
        size="small"
        underlined
      />

      <Spacer size={theme.spacing(12)} />

      <Button 
        title="LOGIN" 
        onPress={handleSubmit} 
        fullWidth
        loading={isLoading}
        disabled={isLoading}
      />

      <Spacer size={theme.spacing(16)} />
      <View style={styles.row}>
        <TextButton
          text="Não tem uma conta? Cadastre-se"
          onPress={() => navigation.navigate('Register' as never)}
          position="center"
          size="medium"
          textStyle={{ fontWeight: fontWeights.bold }}
        />
      </View>
    </View>
  );
};

export default LoginForm;