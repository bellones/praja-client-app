import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View
} from 'react-native';
import { Spacer } from '../../../../components';
import { AppBar } from '../../../../components/appbar';
import { Button } from '../../../../components/button/Button';
import { RegisterForm } from '../../../../components/register';
import { useTheme } from '../../../../theme/ThemeProvider';
import useRegisterPage from '../../hooks/register/useRegisterPage';
import createRegisterStyles from './RegisterStyles';

const RegisterScreen = () => {
  const { theme } = useTheme();
  const {
    showPassword,
    showConfirmPassword,
    isLoading,
    handleShowPassword,
    handleShowConfirmPassword,
    handleSubmit,
    form,
  } = useRegisterPage();

  const styles = createRegisterStyles(theme);

  return (
    <View style={styles.keyboardAvoidView}>
      <AppBar title="" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={true}
          alwaysBounceVertical={false}
        >
          <View style={styles.container}>

            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Criar Conta</Text>
              <Text style={styles.formSubtitle}>Preencha os dados abaixo para criar sua conta</Text>
            </View>
            <View style={styles.formContainer}>
              <RegisterForm
                control={form.control}
                errors={form.formState.errors}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                handleShowPassword={handleShowPassword}
                handleShowConfirmPassword={handleShowConfirmPassword}
              />
              <Spacer size={theme.spacing(4)} />
              <Button
                title="CADASTRAR"
                onPress={handleSubmit}
                fullWidth
                loading={isLoading}
                disabled={isLoading}
                containerStyle={styles.submitButton}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;
