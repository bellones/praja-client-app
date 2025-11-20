// src/app/navigation/RootNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { ForgetPasswordScreen, LoginScreen, RecoverPasswordScreen, RegisterScreen, SplashScreen } from '../features/auth/screens';
import { useTheme } from '../theme/ThemeProvider';
import { MainTabs } from './TabsNavigation';
import {
  AuthStackParamList,
  RootStackParamList,
} from './types';


const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="ForgetPassword"
        component={ForgetPasswordScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="RecoverPassword"
        component={RecoverPasswordScreen}
        options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
};

export const RootNavigator: React.FC = () => {
  const { theme } = useTheme();

  const navigationTheme = {
    dark: theme.mode === 'dark',
    colors: {
      background: theme.colors.background,
      card: theme.colors.surface,
      primary: theme.colors.primary,
      border: theme.colors.border,
      notification: theme.colors.primary,
      text: theme.colors.text,
    },
        fonts: {
          regular: {
            fontFamily: theme.fonts.primary,
            fontWeight: '400' as const,
          },
          medium: {
            fontFamily: theme.fonts.primary,
            fontWeight: '500' as const,
          },
          bold: {
            fontFamily: theme.fonts.primary,
            fontWeight: '700' as const,
          },
          heavy: {
            fontFamily: theme.fonts.primary,
            fontWeight: '900' as const,
          },
        },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Splash"
      >
        <RootStack.Screen name="Splash" component={SplashScreen} />
        <RootStack.Screen name="Auth" component={AuthStackNavigator} />
        <RootStack.Screen name="App" component={MainTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
