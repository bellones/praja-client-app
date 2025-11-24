import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Spacer } from '../../../../components';
import { AppBar } from '../../../../components/appbar';
import { Button } from '../../../../components/button/Button';
import { ForgotPasswordForm } from '../../../../components/forgotpassword';
import { useTheme } from '../../../../theme/ThemeProvider';
import useForgotPasswordPage from '../../hooks/forgotpassword/useForgotPasswordPage';
import createForgetPasswordStyles from './ForgetPasswordStyles';

const ForgetPasswordScreen = () => {
  const { theme } = useTheme();
  const { isLoading, handleSubmit, form } = useForgotPasswordPage();
  const styles = createForgetPasswordStyles(theme);

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
              <Text style={styles.formTitle}>Esqueci minha senha</Text>
              <Text style={styles.formSubtitle}>
                Digite seu email para receber instruções de recuperação de senha
              </Text>
            </View>
            <View style={styles.formContainer}>
              <ForgotPasswordForm
                control={form.control}
                errors={form.formState.errors}
              />
              <Spacer size={theme.spacing(4)} />
              <Button
                title="ENVIAR"
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

export default ForgetPasswordScreen;