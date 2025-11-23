import React, { useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View
} from 'react-native';

import LoginForm from '../../../../components/login/LoginForm';
import { useTheme } from '../../../../theme/ThemeProvider';
import useLoginPage from '../../hooks/login/useLoginPage';
import createLoginStyles from '../../screens/login/LoginStyles';
const LoginPage = () => {
  const { theme } = useTheme();
  const {
    
    showPassword,
    isLoading,
    handleShowPassword,
    handleSubmit,
    form,
  } = useLoginPage();

  const styles = createLoginStyles(theme);
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardAvoidView}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
        bounces={true}
        alwaysBounceVertical={false}
      >
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.titleOne}>Jampa</Text>
            <Text style={styles.titleTwo}>Services</Text>
          </View>
          
          <LoginForm
            control={form.control}
            errors={form.formState.errors}
            showPassword={showPassword}
            isLoading={isLoading}
            handleShowPassword={handleShowPassword}
            handleSubmit={handleSubmit}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;