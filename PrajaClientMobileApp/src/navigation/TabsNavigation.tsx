// src/app/navigation/MainTabs.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TabBarIcon } from '../components/tabbar/TabBarIcon';
import {
  HomeScreen,
  OrderScreen,
  ProfileScreen,
  SearchScreen,
} from '../features/tabs/screens';
import { useTheme } from '../theme/ThemeProvider';
import { MainTabsParamList } from './types';


const Tab = createBottomTabNavigator<MainTabsParamList>();

const renderTabBarIcon = (routeName: string, focused: boolean) => {
  return <TabBarIcon routeName={routeName} focused={focused} />;
};

export const MainTabs: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarIcon: ({ focused }) => renderTabBarIcon(route.name, focused),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Início' }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: 'Buscar' }}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{ title: 'Pedidos' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  );
};
