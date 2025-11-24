import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../../components/button/Button';
import { MainTabsScreenProps } from '../../../../navigation/types';
import { useAuthStore } from '../../../../state';
import { useTheme } from '../../../../theme/ThemeProvider';
import { AppTheme } from '../../../../theme/types';

const ProfileScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<MainTabsScreenProps<'Profile'>['navigation']>();
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);

  const handleLogout = () => {
    // Clear session from Zustand store (will also clear AsyncStorage)
    clearSession();

    // Navigate to Auth screen and reset navigation stack
    const rootNavigation = navigation.getParent();
    if (rootNavigation) {
      rootNavigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        })
      );
    }
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {user && (
          <View style={styles.userInfo}>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.value}>{user.name}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>

            <Text style={styles.label}>Função</Text>
            <Text style={styles.value}>{user.role}</Text>
          </View>
        )}

        <Button
          title="Sair"
          onPress={handleLogout}
          variant="danger"
          fullWidth
          size="large"
        />
      </View>
    </View>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing(4),
    },
    content: {
      flex: 1,
      justifyContent: 'space-between',
    },
    userInfo: {
      marginTop: theme.spacing(4),
    },
    label: {
      fontSize: 14,
      fontFamily: theme.fonts.primary,
      fontWeight: '500',
      color: theme.colors.textSecondary,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1),
    },
    value: {
      fontSize: 16,
      fontFamily: theme.fonts.primary,
      fontWeight: '400',
      color: theme.colors.text,
    },
  });

export default ProfileScreen;