import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import {
  ArrowRightOnRectangleIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  CreditCardIcon,
  HeartIcon,
  HomeIcon,
  QrCodeIcon,
  StarIcon,
  TicketIcon,
  UserIcon
} from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileHeader, ProfileMenuItem } from '../../../../components/profile';
import { MainTabsScreenProps } from '../../../../navigation/types';
import { useAuthStore } from '../../../../state';
import { useTheme } from '../../../../theme';
import { Profile } from '../../../profile/types';
import { createProfileStyles } from './ProfileStyles';

const ProfileScreen = () => {
  const { theme } = useTheme();
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

  const handleMenuPress = useCallback(
    (menuId: string) => {
      if (menuId === 'logout') {
        handleLogout();
        return;
      }
      // Placeholder for menu navigation
      console.log(`Menu item pressed: ${menuId}`);
    },
    [handleLogout]
  );

  const styles = createProfileStyles(theme);

  // Convert User from store to Profile format
  const profile: Profile = useMemo(
    () =>
      user
        ? {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            clubStatus: {
              hasClub: false, // Can be updated if needed
            },
          }
        : {
            id: '',
            name: '',
            email: '',
            role: '',
            clubStatus: {
              hasClub: false,
            },
          },
    [user]
  );

  const menuItems = useMemo(
    () => [
      { id: 'conversas', label: 'Conversas', icon: ChatBubbleLeftRightIcon, badge: 3 },
      { id: 'notificacoes', label: 'Notificações', icon: BellIcon },
      { id: 'dados-conta', label: 'Dados da conta', icon: UserIcon },
      { id: 'endereco', label: 'Endereço', icon: HomeIcon },
      { id: 'pagamentos', label: 'Pagamentos', icon: CreditCardIcon },
      { id: 'cupons', label: 'Cupons', icon: TicketIcon },
      { id: 'codigo-entrega', label: 'Código de Execução da Serviço', icon: QrCodeIcon },
      { id: 'fidelidade', label: 'Fidelidade', icon: StarIcon },
      { id: 'favoritos', label: 'Favoritos', icon: HeartIcon },
      { id: 'logout', label: 'Sair', icon: ArrowRightOnRectangleIcon },
    ],
    []
  );

  const renderMenuItem = useCallback(
    ({ item }: { item: typeof menuItems[0] }) => (
      <ProfileMenuItem
        icon={<item.icon size={24} color={theme.colors.text} />}
        label={item.label}
        badge={item.badge}
        onPress={() => handleMenuPress(item.id)}
      />
    ),
    [theme.colors.text, handleMenuPress]
  );

  const renderSeparator = useCallback(() => <View style={styles.separator} />, [styles.separator]);

  const ListHeaderComponent = useCallback(
    () => (
      <ProfileHeader
        profile={profile}
        onClubPress={() => handleMenuPress('clube')}
      />
    ),
    [profile, handleMenuPress]
  );

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;