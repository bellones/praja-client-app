import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../../components/button/Button';
import { MainTabsScreenProps } from '../../../../navigation/types';
import { useAuthStore } from '../../../../state';
import { useTheme } from '../../../../theme/ThemeProvider';
import createProfileStyles from './ProfileStyles';

const ProfileScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createProfileStyles(theme), [theme]);
  const navigation = useNavigation<MainTabsScreenProps<'Profile'>['navigation']>();
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);

  const handleLogout = useCallback(() => {
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
  }, [clearSession, navigation]);

  const spacerStyle = useMemo(
    () => ({ height: 48, marginVertical: theme.spacing(4) }),
    [theme]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Perfil</Text>
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
        <View style={spacerStyle} />
        <Button
          title="Sair"
          onPress={handleLogout}
          variant="danger"
          fullWidth
          size="large"
        />
      </View>
    </SafeAreaView>
  );
};



export default ProfileScreen;