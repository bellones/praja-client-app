import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ClipboardDocumentCheckIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import {
  ClipboardDocumentCheckIcon as ClipboardDocumentCheckIconSolid,
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  UserIcon as UserIconSolid
} from 'react-native-heroicons/solid';
import { useTheme } from '../../theme/ThemeProvider';

interface TabBarIconProps {
  routeName: string;
  focused: boolean;
}

const TabIcon = ({ routeName, focused }: TabBarIconProps) => {
  const { theme } = useTheme();
  const iconColor = focused ? theme.colors.primary : theme.colors.textSecondary;
  const iconSize = 24;

  switch (routeName) {
    case 'Home':
      return focused ? (
        <HomeIconSolid size={iconSize} color={iconColor} />
      ) : (
        <HomeIcon size={iconSize} color={iconColor} />
      );
    case 'Search':
      return focused ? (
        <MagnifyingGlassIconSolid size={iconSize} color={iconColor} />
      ) : (
        <MagnifyingGlassIcon size={iconSize} color={iconColor} />
      );
    case 'Order':
      return focused ? (
        <ClipboardDocumentCheckIconSolid size={iconSize} color={iconColor} />
      ) : (
        <ClipboardDocumentCheckIcon size={iconSize} color={iconColor} />
      );
    case 'Profile':
      return focused ? (
        <UserIconSolid size={iconSize} color={iconColor} />
      ) : (
        <UserIcon size={iconSize} color={iconColor} />
      );
    default:
      return null;
  }
};

export const TabBarIcon: React.FC<TabBarIconProps> = ({ routeName, focused }) => {
  return (
    <View style={styles.container}>
      <TabIcon routeName={routeName} focused={focused} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});