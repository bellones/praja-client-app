import { CommonActions, useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import { View } from 'react-native';
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

import { ProfileHeader, ProfileMenuItem } from '../../../../components/profile';
import { MainTabsScreenProps, RootStackNavigationProp } from '../../../../navigation/types';
import { useAuthStore } from '../../../../state';
import { useTheme } from '../../../../theme/ThemeProvider';

const useProfileScreen = () => {
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

      // Map menu IDs to ProfileStack screen names
      const screenMap: Record<string, keyof import('../../../../navigation/types').ProfileStackParamList> = {
        'conversas': 'Conversations',
        'notificacoes': 'Notifications',
        'dados-conta': 'AccountData',
        'endereco': 'Address',
        'pagamentos': 'Payments',
        'cupons': 'Coupons',
        'codigo-entrega': 'ServiceExecutionCode',
        'fidelidade': 'Loyalty',
        'favoritos': 'Favorites',
      };

      const screenName = screenMap[menuId];
      if (screenName) {
        const rootNavigation = navigation.getParent<RootStackNavigationProp<'ProfileStack'>>();
        if (rootNavigation) {
          rootNavigation.navigate('ProfileStack', { 
            screen: screenName
          });
        }
      }
    },
    [handleLogout, navigation]
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

  const renderSeparator = useCallback(
    (separatorStyle: any) => () => <View style={separatorStyle} />,
    []
  );

  const ListHeaderComponent = useCallback(() => <ProfileHeader />, []);

  return {
    user,
    menuItems,
    renderMenuItem,
    renderSeparator,
    ListHeaderComponent,
  };
};

export default useProfileScreen;

